import React from "react";
import Layout from "../components/layout";

export default function MedicationAction() {
  return (
    <Layout>
      <div>
        <form className="box" method="POST" action="/api/update-record">
          <h1>Medication reminder</h1>
          <p>Have you taken you 3pm Ramipril tablets? 🤔</p>
          <label htmlFor="notification">Yes</label>
          <input
            type="radio"
            id="notification"
            value="true"
            name="notification"
          />
          <label htmlFor="notification">Remind me later</label>
          <input
            type="radio"
            id="notification"
            value="false"
            name="notification"
          />
          <label htmlFor="notification">I forgot/not taking today</label>
          <input
            type="radio"
            id="notification"
            value="false"
            name="notification"
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </Layout>
  );
}
