import React from "react";
import Link from "next/link";

export default function MedicineBox({ medicineObj, medicationInfo }) {
  console.log("medication info", medicationInfo);
  return (
    <Link href="/medication">
      <a>
        <div className="box">
          <h2>Your medicines 💊</h2>
          <ul>
            {medicationInfo.map((medication) => (
              <li className="med">
                <p>{medication.medname}</p>
                <p>{medication.medicationtype}</p>
                <p>
                  {medication.meddose}
                  {medication.units}
                </p>
                <p>{medication.medtime}</p>
                <p>{medication.notes}</p>
              </li>
            ))}
          </ul>
        </div>
      </a>
    </Link>
  );
}

/* <p>
            {medicineObj.remaining} / {medicineObj.total} {medicineObj.drug}
          </p> */
