import React from "react";
import Layout from "../components/layout";

export default function MedicationAction() {
  return (
    <Layout>
      <div>
        <h1>Medication reminder</h1>
        <p>Have you taken you 3pm Ramipril tablets? 🤔</p>
        <div className="box">
          <button>Yes</button>
          <button>Remind me later</button>
          <button>I forgot/not taking today</button>
        </div>
      </div>
    </Layout>
  );
}
