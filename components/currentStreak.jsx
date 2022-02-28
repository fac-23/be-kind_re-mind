import React from "react";

import Link from "next/link";

export default function CurrentStreak({ currentStreak }) {
  return (
    <Link href="/history">
      <a>
        <div className="box">
          <p>Your current streak is: {currentStreak}</p>
        </div>
      </a>
    </Link>
  );
}
