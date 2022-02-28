import React from "react";
import Link from "next/link";

export default function MedicineBox({ medicineObj }) {
  return (
    <Link href="/medication">
      <a>
        <div className="box">
          <h2>Your medicines 💊</h2>
          <p>
            {medicineObj.remaining} / {medicineObj.total} {medicineObj.drug}
          </p>
        </div>
      </a>
    </Link>
  );
}
