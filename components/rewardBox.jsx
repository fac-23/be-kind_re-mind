import React from "react";

import Link from "next/link";

export default function RewardBox() {
  return (
    <Link href="/rewards">
      <a>
        <div className="box">
          <h2>Rewards</h2>Check out your plant progress 🪴🌻
        </div>
      </a>
    </Link>
  );
}
