import Link from "next/link";
import React from "react";

export default function Signup() {
  return (
    <div>
      <h1>Sign up</h1>
      <form action="/api/sign-up" method="POST">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="phone">Phone Number</label>
        <input type="number" id="phone" name="phone" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button className="button">Sign up</button>
      </form>
      <Link href={"/"}>
        <a>Back to landing page</a>
      </Link>
    </div>
  );
}
