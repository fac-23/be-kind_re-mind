import React from "react";
import Link from "next/link";

export default function Unauthorised() {
  return (
    <div>
      <h1>Access denied 🚨</h1>
      <p>
        <Link href="/">
          <a>Log in </a>
        </Link>
        or
        <Link href="/sign-up">
          <a> Sign up </a>
        </Link>
        to access this page!
      </p>
    </div>
  );
}
