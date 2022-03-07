import React from "react";
import Link from "next/link";

export default function Rewards() {
  return (
    <div>
      <h1>An account is already registered with this email!🚨</h1>
      <Link href={"/signup"}>
        <a>Return to sign up</a>
      </Link>
    </div>
  );
}
