import React from "react";
import Link from "next/link";

export default function Rewards() {
  return (
    <div>
      <h1>Password or Email Incorrect!🚨</h1>
      <Link href={"/login"}>
        <a>Return to login</a>
      </Link>
    </div>
  );
}
