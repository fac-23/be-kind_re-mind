import React from "react";
import Link from "next/link";

export default function Login() {
  return (
    <div>
      <h1>Log in</h1>
      <form action="/api/log-in" method="POST">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button>Log in</button>
      </form>
      <Link href={"/"}>
        <a>Back to landing page</a>
      </Link>
    </div>
  );
}
