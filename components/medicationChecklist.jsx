import React from "react";

export default function MedicationChecklist({ showDaily }) {
  //Medicine name, medicine time, taken not taken
  return (
    <div>
      <h3>Todays Stats</h3>
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

      <ul>
        {showDaily &&
          showDaily.map((elem) => {
            return !elem.taken ? (
              <li key={elem.name}>{elem.name} taken 🚥</li>
            ) : (
              ""
            );
          })}
      </ul>
    </div>
  );
}
