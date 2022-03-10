import React from "react";

import Link from "next/link";

export default function RewardBox() {
  return (
    <Link href="/rewards">
      <a>
        <h2>Rewards</h2>
        <p>Check out your plant progress 🌻</p>
      </a>
    </Link>
  );
}
