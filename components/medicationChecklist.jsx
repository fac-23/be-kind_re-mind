import React from "react";

export default function MedicationChecklist({ showDaily }) {
  //Medicine name, medicine time, taken not taken
  return (
    <div className="box">
      <h3>Taken</h3>
      <ul>
        {showDaily &&
          showDaily.map((elem) => {
            return elem.taken ? (
              <li key={elem.name}>{elem.name} taken 🌟</li>
            ) : (
              ""
            );
          })}
      </ul>

      <h3>Not taken</h3>
      <ul>
        {showDaily &&
          showDaily.map((elem) => {
            return !elem.taken ? (
              <li key={elem.name}>{elem.name} not taken 🚥</li>
            ) : (
              ""
            );
          })}
      </ul>
    </div>
  );
}
