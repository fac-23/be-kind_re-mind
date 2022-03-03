import React from "react";

export default function MedicineBox({ medicineObj, medicationInfo }) {
  // console.log("medication info", medicationInfo[0].id);
  return (
    <div className="box">
      <h2>Your medicines 💊</h2>
      <ul>
        {medicationInfo && medicationInfo.map((medication) => (
          <li className="med" key={medication.id}>
            <p>{medication.medname}</p>
            <p>{medication.medicationtype}</p>
            <p>
              {medication.meddose}
              {medication.units}
            </p>
            <p>{medication.medtime}</p>
            <p>{medication.notes}</p>
            <form method="POST" action="/api/delete-med">
              <input
                type="hidden"
                id="deleteInput"
                name="id"
                value={medication.id}
              />
              <button type="submit">Delete Medication</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* <p>
            {medicineObj.remaining} / {medicineObj.total} {medicineObj.drug}
          </p> */
