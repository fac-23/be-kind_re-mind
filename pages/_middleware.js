import { NextResponse } from "next/server";

export default function middleware(req) {
  // make sure there is always a session cookie before every page loads
  // get the actual response for the page about to render
  const response = NextResponse.next();

  const sid = req.cookies.sid;
  console.log(req.nextUrl.pathname);

  if (
    req.nextUrl.pathname !== "/logo.svg" ||
    req.nextUrl.pathname !== "/sign-up" ||
    req.nextUrl.pathname !== "/log-in" ||
    req.nextUrl.pathname !== "/"
  ) {
    return response;
  }

  if (!sid) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  } else {
    return response;
  }
}
