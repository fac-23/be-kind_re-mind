import React from "react";
import Layout from "../components/layout";
import { getRecord } from "../database/model";

export async function getServerSideProps() {
  const record = await getRecord(1);
  const cleanRecord = record.map((record) => {
    const stringDate = String(record.date);
    const cleanDate = stringDate.slice(0, 10);
    record.date = cleanDate;
    return record;
  });
  console.log("clean record", cleanRecord);
  return {
    props: {
      cleanRecord,
    },
  };
}
export default function MedicationAction() {
  return (
    <Layout>
      <div>
        <form className="box" method="POST" action="/api/update-record">
          <h1>Medication reminder</h1>
          <p>Have you taken you 3pm Ramipril tablets? 🤔</p>
          <label htmlFor="notification">Yes</label>

          <input type="radio" id="notification" value="true" name="taken" />
          <label htmlFor="notification">Remind me later</label>
          <input type="radio" id="notification" value="false" name="taken" />
          <label htmlFor="notification">I forgot/not taking today</label>
          <input type="radio" id="notification" value="false" name="taken" />
          <button type="submit">Save</button>
        </form>
      </div>
    </Layout>
  );
}
