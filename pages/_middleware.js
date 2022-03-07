import { NextResponse } from "next/server";

export default function middleware(req) {
  // make sure there is always a session cookie before every page loads
  // get the actual response for the page about to render
  const response = NextResponse.next();

  const sid = req.cookies.sid;
  const url = req.nextUrl.pathname;

  console.log("middleware SID", sid);

  if (req.nextUrl.pathname === "/") {
    return response;
  }

  //if no sid
  //and path is not home, or login, or signup, or favicon
  //redirect to home

  if (!sid && url === "/home") {
    return NextResponse.rewrite(new URL("/unauthorised", req.url));
  }

  if (!sid && url === "/history") {
    return NextResponse.rewrite(new URL("/unauthorised", req.url));
  }

  if (!sid && url === "/notification") {
    return NextResponse.rewrite(new URL("/unauthorised", req.url));
  }

  if (!sid && url === "/medication") {
    return NextResponse.rewrite(new URL("/unauthorised", req.url));
  }

  if (!sid && url === "/rewards") {
    return NextResponse.rewrite(new URL("/unauthorised", req.url));
  }
}
