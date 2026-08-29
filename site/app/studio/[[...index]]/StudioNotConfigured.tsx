export default function StudioNotConfigured() {
  return (
    <main style={{ maxWidth: "34rem", margin: "0 auto", padding: "4rem 1.5rem", lineHeight: 1.6 }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Studio not configured</h1>
      <p>
        The shop is running on the catalogue checked into the repository. To
        edit pieces here instead, set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>{" "}
        (and <code>NEXT_PUBLIC_SANITY_DATASET</code>) in the deployment
        environment and redeploy. See <code>.env.example</code>.
      </p>
    </main>
  );
}
