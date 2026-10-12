import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLaunched } from "@/lib/site";

// Until launch (LAUNCH_AT in lib/site.ts), every page shows the coming-soon
// page at its own address, so links shared early still work once the shop
// opens. After launch this lets everything through untouched.
//
// To see the real shop before launch, visit any page with
// ?preview=<PREVIEW_KEY> once (the key is set in Vercel, not in code): it
// leaves a cookie that lets that browser in until launch.
const COMING_SOON = "/coming-soon";
const PREVIEW_COOKIE = "tmy_preview";

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (isLaunched()) {
    return pathname === COMING_SOON
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();
  }

  const key = process.env.PREVIEW_KEY;
  if (key && searchParams.get("preview") === key) {
    const clean = request.nextUrl.clone();
    clean.searchParams.delete("preview");
    const res = NextResponse.redirect(clean);
    res.cookies.set(PREVIEW_COOKIE, key, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  }
  if (key && request.cookies.get(PREVIEW_COOKIE)?.value === key) {
    return NextResponse.next();
  }

  if (pathname === COMING_SOON) return NextResponse.next();
  return NextResponse.rewrite(new URL(COMING_SOON, request.url));
}

export const config = {
  // Pages only: the Studio, Next's own files, share images and anything
  // with a file extension (photos, icons, robots.txt, sitemap.xml) always load.
  matcher: ["/((?!_next/|studio|api/|opengraph-image|.*\\.[a-z0-9]+$).*)"],
};
