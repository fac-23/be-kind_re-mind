import React from "react";
import Layout from "../components/layout";
import {
  //getRecord,
  retrieveMedDetails,
  //getSessionInfo,
} from "../database/model";

export async function getServerSideProps() {
  //look up user_id in db
  // const userData = await getSessionInfo(req.cookies.sid);
  // const user_id = JSON.parse(userData.data).user_id;
  // console.log("user_id", user_id);

  //function that runs db query on medications and record tables on inner join, returning array of objects where taken = false and user_id = $1  parsed as argument
  const fullMedDetails = await retrieveMedDetails(1);

  const cleanMedDetails = fullMedDetails.map((details) => {
    const stringDate = String(details.date);
    const cleanDate = stringDate.slice(0, 10);
    details.date = cleanDate;
    return details;
  });

  // console.log("full med details", fullMedDetails);
  // console.log("clean med details", cleanMedDetails);

  return {
    props: {
      cleanMedDetails,
    },
  };
}
export default function MedicationAction() {
  return (
    <Layout>
      <div>
        <form className="box" method="POST" action="/api/update-record">
          <h1>Medication reminder</h1>
          <p>Have you taken you 3pm props tablets? 🤔</p>
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

// const fullMedDetails = cleanRecord.map((record) => {
//   //uses medication id to query db and return the full details for that med
//   retrieveMedDetails(record.med_id).then((result) => {
//     let record = result;
//     fullMedDetailsArray.push(record);

//     console.log("full med details array", fullMedDetailsArray);
//   });
//   //line 53 console log returning BEFORE line 51
//   console.log("answer 53", fullMedDetailsArray);
//   return fullMedDetailsArray;
// });

//function which takes user id and finds record of medication schdedule
// const record = await getRecord(1);

// //function to turn sql date into js date
// const cleanRecord = record.map((record) => {
//   const stringDate = String(record.date);
//   const cleanDate = stringDate.slice(0, 10);
//   record.date = cleanDate;
//   return record;
// });

// console.log("cleanRecord", cleanRecord);

// cleanRecord[
//   { id: 2, date: "Wed Mar 02", user_id: 1, med_id: 2, taken: false },
//   { id: 3, date: "Wed Mar 02", user_id: 1, med_id: 3, taken: false },
//   { id: 4, date: "Wed Mar 02", user_id: 1, med_id: 1, taken: false }
// ];
// example of one result objects returned
// result {
// id: 1,
// user_id: null,
// medicationtype: 'tablets',
// medname: 'Aspirin',
// meddose: '200',
// units: 'mg',
// tabcount: 28,
// medtime: '13:00',
// customtime: 'no',
//}
