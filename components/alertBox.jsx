import React from "react";

import Link from "next/link";

export default function AlertBox() {
  return (
    <Link href="/medication-action" passHref>
      <a>
        <h2>Medication Alert</h2>
        <p>Response required ⚠️</p>
      </a>
    </Link>
  );
}
