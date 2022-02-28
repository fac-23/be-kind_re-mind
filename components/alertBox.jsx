import React from "react";
import Link from "next/link";

export default function AlertBox() {
  return (
    <Link href="/medication-action">
      <a>
        <div className="box">
          <h2>Medication Alert</h2>
          <p>Ramipril - response required ⚠️</p>
        </div>
      </a>
    </Link>
  );
}
