#!/usr/bin/env node
/**
 * Point a Cloudflare-hosted domain at this project's Vercel deployment.
 *
 * Adds the apex and www domains to the Vercel project, creates the matching
 * DNS records in Cloudflare (unproxied), sets the apex/www redirect, and polls
 * Vercel until it reports the domain correctly configured.
 *
 * Dry run by default — pass --apply to actually make changes.
 *
 *   DOMAIN=example.com \
 *   VERCEL_TOKEN=... \
 *   CLOUDFLARE_API_TOKEN=... \
 *   node scripts/link-domain.mjs --apply
 *
 * Tokens are read from the environment only, never from argv, so they don't
 * leak into your shell history or the process list.
 */

const args = new Set(process.argv.slice(2));
const APPLY = args.has("--apply");
const REPLACE = args.has("--replace");

const {
  DOMAIN,
  VERCEL_TOKEN,
  CLOUDFLARE_API_TOKEN,
  VERCEL_TEAM_ID,
  // Vercel publishes these; both are overridable because Vercel occasionally
  // rotates them and issues per-project CNAME targets. If they're wrong for
  // your project the verification poll at the end will say so rather than
  // reporting a false success.
  VERCEL_A_RECORD = "216.198.79.1",
  VERCEL_CNAME_TARGET = "cname.vercel-dns.com",
  // "apex" -> www redirects to example.com; "www" -> the other way round.
  PRIMARY = "apex",
} = process.env;

const fail = (msg) => {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
};

if (!DOMAIN) fail("DOMAIN is not set (e.g. DOMAIN=example.com).");
if (/^www\./i.test(DOMAIN)) {
  fail(`DOMAIN should be the apex domain. Use ${DOMAIN.replace(/^www\./i, "")}, not ${DOMAIN} — the www host is added for you.`);
}
if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(DOMAIN)) {
  fail(`DOMAIN "${DOMAIN}" doesn't look like a bare domain. Use example.com, not https://example.com.`);
}
if (!VERCEL_TOKEN) fail("VERCEL_TOKEN is not set.");
if (!CLOUDFLARE_API_TOKEN) fail("CLOUDFLARE_API_TOKEN is not set.");
if (PRIMARY !== "apex" && PRIMARY !== "www") fail(`PRIMARY must be "apex" or "www", got "${PRIMARY}".`);

const WWW = `www.${DOMAIN}`;
const primaryHost = PRIMARY === "apex" ? DOMAIN : WWW;
const secondaryHost = PRIMARY === "apex" ? WWW : DOMAIN;

/* ---------------------------------------------------------------- project */

async function resolveProject() {
  if (process.env.VERCEL_PROJECT) return process.env.VERCEL_PROJECT;
  try {
    const { readFileSync } = await import("node:fs");
    const { fileURLToPath } = await import("node:url");
    const { dirname, join } = await import("node:path");
    const here = dirname(fileURLToPath(import.meta.url));
    const linked = JSON.parse(readFileSync(join(here, "..", ".vercel", "project.json"), "utf8"));
    if (linked.projectId) {
      if (linked.orgId && !VERCEL_TEAM_ID) process.env.VERCEL_TEAM_ID = linked.orgId;
      return linked.projectId;
    }
  } catch {
    /* not linked locally — fall through */
  }
  fail('Cannot tell which Vercel project to use. Set VERCEL_PROJECT to the project name or id, or run "vercel link" in site/ first.');
}

/* ------------------------------------------------------------------- http */

async function request(url, init, label) {
  let res;
  try {
    res = await fetch(url, init);
  } catch (err) {
    fail(`Couldn't reach ${label} (${new URL(url).host}): ${err.message}\n  Check your network / proxy and try again.`);
  }
  const text = await res.text();
  if (!text) return { res, json: {} };
  try {
    return { res, json: JSON.parse(text) };
  } catch {
    const snippet = text.replace(/\s+/g, " ").slice(0, 160);
    fail(`${label} returned ${res.status} with a non-JSON body:\n  ${snippet}\n  That usually means a proxy, firewall or outage sits between you and the API.`);
  }
}

const teamQuery = () => {
  const id = process.env.VERCEL_TEAM_ID || VERCEL_TEAM_ID;
  return id ? `?teamId=${encodeURIComponent(id)}` : "";
};

async function vercel(method, path, body) {
  const sep = path.includes("?") ? "&" : "?";
  const q = teamQuery().replace("?", sep);
  const { res, json } = await request(
    `https://api.vercel.com${path}${q}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    },
    "the Vercel API",
  );
  if (res.status === 401 || res.status === 403) {
    fail(`Vercel rejected the token on ${method} ${path}: ${json?.error?.message || res.status}.\n  Check VERCEL_TOKEN, and VERCEL_TEAM_ID if the project belongs to a team.`);
  }
  return { ok: res.ok, status: res.status, json };
}

async function cloudflare(method, path, body, { tolerate = false } = {}) {
  const { res, json } = await request(
    `https://api.cloudflare.com/client/v4${path}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    },
    "the Cloudflare API",
  );
  if (!json.success && !tolerate) {
    const detail = (json.errors || []).map((e) => `${e.code} ${e.message}`).join("; ");
    if (res.status === 401 || res.status === 403) {
      fail(`Cloudflare rejected the token on ${method} ${path}: ${detail || res.status}.\n  The token needs Zone:Read and Zone:DNS:Edit on ${DOMAIN}.`);
    }
    fail(`Cloudflare ${method} ${path} failed: ${detail || res.status}`);
  }
  return { ok: res.ok && json.success, status: res.status, json };
}

/* ------------------------------------------------------------------ steps */

async function addProjectDomain(project, name) {
  const { ok, status, json } = await vercel("POST", `/v10/projects/${encodeURIComponent(project)}/domains`, { name });
  if (ok) {
    console.log(`  + ${name} added to the Vercel project`);
    return json;
  }
  const code = json?.error?.code;
  if (status === 409 || code === "domain_already_in_use" || code === "domain_already_exists") {
    console.log(`  · ${name} already on the project`);
    const existing = await vercel("GET", `/v9/projects/${encodeURIComponent(project)}/domains/${name}`);
    return existing.json;
  }
  if (code === "domain_taken" || code === "forbidden") {
    fail(`Vercel refused ${name}: ${json?.error?.message || code}. It's probably attached to another Vercel account or project — remove it there first.`);
  }
  fail(`Vercel rejected ${name} (${status}): ${json?.error?.message || JSON.stringify(json)}`);
}

async function setRedirect(project, from, to) {
  const { ok, json } = await vercel("PATCH", `/v9/projects/${encodeURIComponent(project)}/domains/${from}`, {
    redirect: to,
    redirectStatusCode: 308,
  });
  if (ok) console.log(`  + ${from} → ${to} (308)`);
  else console.log(`  ! couldn't set the ${from} redirect: ${json?.error?.message || "unknown error"}`);
}

async function getZone() {
  const { json } = await cloudflare("GET", `/zones?name=${encodeURIComponent(DOMAIN)}`);
  const zone = json?.result?.[0];
  if (!zone) {
    fail(`No Cloudflare zone found for ${DOMAIN}. Check the domain is in this Cloudflare account and the token has Zone:Read on it.`);
  }
  return zone;
}

async function checkSslMode(zoneId) {
  const { ok, json } = await cloudflare("GET", `/zones/${zoneId}/settings/ssl`, null, { tolerate: true });
  if (!ok) {
    console.log("  · SSL/TLS mode not readable with this token — skipping the check");
    return;
  }
  const mode = json?.result?.value;
  if (mode === "flexible") {
    console.log(`  ! SSL/TLS mode is "flexible". That causes a redirect loop with Vercel.`);
    console.log(`    Set it to "Full (strict)" in Cloudflare → SSL/TLS → Overview.`);
  } else {
    console.log(`  · SSL/TLS mode: ${mode}`);
  }
}

async function upsertRecord(zoneId, { type, name, content }) {
  const fqdn = name === "@" ? DOMAIN : `${name}.${DOMAIN}`;
  const { json } = await cloudflare("GET", `/zones/${zoneId}/dns_records?name=${encodeURIComponent(fqdn)}`);
  const existing = (json?.result || []).filter((r) => ["A", "AAAA", "CNAME"].includes(r.type));

  const alreadyRight = existing.find(
    (r) => r.type === type && r.content.replace(/\.$/, "") === content.replace(/\.$/, "") && r.proxied === false,
  );
  if (alreadyRight && existing.length === 1) {
    console.log(`  · ${fqdn} ${type} → ${content} already correct`);
    return;
  }

  const conflicts = existing.filter((r) => r.id !== alreadyRight?.id);
  if (conflicts.length && !REPLACE) {
    console.log(`  ! ${fqdn} already has records that conflict:`);
    for (const r of conflicts) {
      console.log(`      ${r.type} ${r.name} → ${r.content}${r.proxied ? " (proxied)" : ""}`);
    }
    console.log(`    Re-run with --replace to overwrite them, or delete them in Cloudflare yourself.`);
    return;
  }

  if (!APPLY) {
    for (const r of conflicts) console.log(`  - would delete ${r.type} ${r.name} → ${r.content}`);
    if (!alreadyRight) console.log(`  + would create ${type} ${fqdn} → ${content} (DNS only)`);
    return;
  }

  for (const r of conflicts) {
    await cloudflare("DELETE", `/zones/${zoneId}/dns_records/${r.id}`);
    console.log(`  - deleted ${r.type} ${r.name} → ${r.content}`);
  }
  if (!alreadyRight) {
    await cloudflare("POST", `/zones/${zoneId}/dns_records`, {
      type,
      name,
      content,
      ttl: 1,
      proxied: false, // grey cloud: Vercel needs to see the origin to issue its cert
      comment: "Vercel — managed by scripts/link-domain.mjs",
    });
    console.log(`  + created ${type} ${fqdn} → ${content} (DNS only)`);
  }
}

async function waitForVercel() {
  const deadline = Date.now() + 5 * 60 * 1000;
  let attempt = 0;
  while (Date.now() < deadline) {
    attempt++;
    const { json } = await vercel("GET", `/v6/domains/${DOMAIN}/config`);
    if (json && json.misconfigured === false) {
      console.log(`  ✓ Vercel reports ${DOMAIN} correctly configured`);
      return true;
    }
    process.stdout.write(`  · not verified yet (attempt ${attempt}) — waiting 15s\r`);
    await new Promise((r) => setTimeout(r, 15000));
  }
  console.log("\n  ! Still unverified after 5 minutes.");
  console.log("    Open Vercel → Settings → Domains and compare the records it lists against");
  console.log(`    what's in Cloudflare. If they differ, re-run with VERCEL_A_RECORD / VERCEL_CNAME_TARGET set to Vercel's values.`);
  return false;
}

/* ------------------------------------------------------------------- main */

const project = await resolveProject();

console.log(`\n${APPLY ? "Linking" : "DRY RUN — linking"} ${DOMAIN} to Vercel project ${project}`);
console.log(`Primary host: ${primaryHost}  (${secondaryHost} will 308 to it)\n`);

console.log("Vercel — project");
const projectCheck = await vercel("GET", `/v9/projects/${encodeURIComponent(project)}`);
if (!projectCheck.ok) {
  fail(`Vercel can't find project "${project}" (${projectCheck.status}): ${projectCheck.json?.error?.message || "not found"}.\n  Check VERCEL_PROJECT, and set VERCEL_TEAM_ID if it belongs to a team.`);
}
console.log(`  · ${projectCheck.json.name} (${projectCheck.json.id})`);

console.log("\nVercel — project domains");
if (APPLY) {
  await addProjectDomain(project, DOMAIN);
  await addProjectDomain(project, WWW);
  await setRedirect(project, secondaryHost, primaryHost);
} else {
  console.log(`  + would add ${DOMAIN} and ${WWW}`);
  console.log(`  + would redirect ${secondaryHost} → ${primaryHost} (308)`);
}

console.log("\nCloudflare — zone");
const zone = await getZone();
console.log(`  · zone ${zone.name} (${zone.id}), status ${zone.status}`);
await checkSslMode(zone.id);

console.log("\nCloudflare — DNS records");
await upsertRecord(zone.id, { type: "A", name: "@", content: VERCEL_A_RECORD });
await upsertRecord(zone.id, { type: "CNAME", name: "www", content: VERCEL_CNAME_TARGET });

if (!APPLY) {
  console.log("\nDry run only — nothing changed. Re-run with --apply to do it for real.\n");
  process.exit(0);
}

console.log("\nVerifying (up to 5 minutes)");
const verified = await waitForVercel();

console.log(`\n${verified ? "✓" : "!"} Done. Check https://${primaryHost} once the certificate finishes issuing.\n`);
process.exit(verified ? 0 : 1);
