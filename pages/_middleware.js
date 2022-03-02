import { NextResponse } from "next/server";

export default function middleware(req) {
  // make sure there is always a session cookie before every page loads
  // get the actual response for the page about to render
  const response = NextResponse.next();

  let sid = req.cookies.sid;
  const url = req.nextUrl.pathname;

  console.log(url);
  sid = true;

  if (req.nextUrl.pathname === "/") {
    console.log("here");
    return response;
  }

  //if no sid
  //and path is not home, or login, or signup, or favicon
  //redirect to home

  if (!sid && url === "/home") {
    console.log("no sid");
    return NextResponse.rewrite(new URL("/unauthorised", req.url));
  }

  if (!sid && url === "/history") {
    console.log("no sid");
    return NextResponse.rewrite(new URL("/unauthorised", req.url));
  }

  if (!sid && url === "/notification") {
    console.log("no sid");
    return NextResponse.rewrite(new URL("/unauthorised", req.url));
  }

  if (!sid && url === "/medication") {
    console.log("no sid");
    return NextResponse.rewrite(new URL("/unauthorised", req.url));
  }

  if (!sid && url === "/rewards") {
    console.log("no sid");
    return NextResponse.rewrite(new URL("/unauthorised", req.url));
  }

  //otherwise send responsex

  //   if (!sid) {
  //     const url = req.nextUrl.clone();
  //     url.pathname = "/";
  //     return NextResponse.redirect(url);
  //   } else {
  //     return response;
  //   }
}
