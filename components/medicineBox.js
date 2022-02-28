import React from "react";

export default function MedicineBox({ medicineObj }) {
  return (
    <div>
      <h2>Your medicines 💊:</h2>
      <p>
        {medicineObj.remaining} / {medicineObj.total} {medicineObj.drug}
      </p>
    </div>
  );
}
