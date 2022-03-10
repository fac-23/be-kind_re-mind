import React from "react";
import Layout from "../components/layout";
import {
  //getRecord,
  retrieveMedDetails,
  getSessionInfo,
  //newRecordRow,
} from "../database/model";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faHourglass,
} from "@fortawesome/free-solid-svg-icons";

const StyledButton = styled.button`
  background: var(--color-one);
  margin: 1rem;
  display: block;
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-family: var(--heading-font);
  font-size: 1.2rem;
  line-height: 20px;
  list-style: none;
  outline: none;
  padding: 0.5rem;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  border: none;
  width: calc(100% - 2rem);

  & :hover {
    background: #cc8c10;
    transform: scale(0.99);
  }
`;

const StyledForm = styled.form`
  border: 3px solid var(--color-one);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-sizing: border-box;
  margin: 2rem;

  h1 {
    color: var(--color-two);
    font-family: var(--heading-font);
    border-bottom: 1px solid var(--color-one);
    font-size: 2.5rem;
    margin: 0.5rem auto;
    text-align: center;
  }

  @media only screen and (max-width: 360px) {
    h1 {
      background: font-size: 1.1rem;
      border: none;
      width: 100%;
      font-size: 1.2rem;

    }
  }
`;

const StyledInputBox = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;


  div:hover {
    transform: scale(1.1);
    border: none;
    cursor: pointer;
  }

  input[type="radio"] {
    cursor: pointer;
  }

  fieldset {
    font-size: 1.3rem;
    border: none;
    margin:0.25rem 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    
  }

  legend {
    font-family: var(--heading-font);
    border: solid 3px var(--color-two);
    margin: 1rem auto;
    padding: 0.5rem;
    box-shadow: var(--box-shadow);
    border-radius: 5px;
  }

  label {
    font-family: var(--body-font);
  }

  input[type="radio"] {
    background-color: var(--color-one);
    padding: 1rem;
    font-family: var(--body-font);
    font-size: 1rem;
  }

  div {
    padding: 0.5rem;
    font-family: var(--body-font);
    font-size: 1.1rem;
    border: none;
    border-radius: 5px;
    color: white;
    margin 0 0.5rem;
  }

  div:focus {
    border: 2px solid var(--color-one);
  }

  @media only screen and (max-width: 360px) {
   legend {
      font-size: 0.9rem;
      padding: 0.5rem;
      width: 100%;
    }
    fieldset {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    div {
      margin: 0.5rem 0.5rem;
    }
  }
`;

const StyledPurple = styled.div`
  background: var(--color-three);

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 360px) {
    label {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 0.8rem;
    }
  }
`;

const StyledGreen = styled.div`
  background: var(--color-one);
  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (max-width: 360px) {
    label {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 0.8rem;
    }
  }
`;

const StyledYellow = styled.div`
  background: var(--color-two);
  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (max-width: 360px) {
    label {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 0.8rem;
    }
  }
`;

export async function getServerSideProps({ req, res }) {
  //look up user_id in db
  const userData = await getSessionInfo(req.cookies.sid);
  const user_id = JSON.parse(userData.data).user_id;
  console.log("user_id", user_id);

  //function that runs db query on medications and record tables on inner join, returning array of objects where taken = false and user_id = $1  parsed as argument
  const fullMedDetails = await retrieveMedDetails(user_id);

  //clean the date in the med details so it is accepted by React
  const cleanMedDetails = fullMedDetails.map((details) => {
    const stringDate = String(details.date);
    const cleanDate = stringDate.slice(0, 10);
    details.date = cleanDate;
    return details;
  });

  // console.log("full med details", fullMedDetails);
  console.log("clean med details", cleanMedDetails);

  return {
    props: {
      cleanMedDetails,
    },
  };
}
export default function MedicationAction({ cleanMedDetails }) {
  console.log("cleanMedDetails", cleanMedDetails);
  //console.log("cleanMedDetails length", cleanMedDetails.length);

  // const reminder = medicationArray

  return (
    <Layout>
      <div>
        <StyledForm method="POST" action="/api/update-record">
          <h1>Medication reminder</h1>
          <StyledInputBox>
            {cleanMedDetails.map((med) => (
              <fieldset key={med.id} name={med.id}>
                <legend>
                  Have you taken your {med.medtime} {med.medname}{" "}
                  {med.medicationtype}? 🤔
                </legend>
                <StyledGreen>
                  <input
                    type="radio"
                    id={med.med_id}
                    value="true"
                    name={med.med_id}
                  />
                  <label htmlFor={med.med_id}>
                    Yes, I've taken today{" "}
                    <FontAwesomeIcon
                      className="iconTime"
                      size="lg"
                      icon={faCircleCheck}
                    />
                  </label>
                </StyledGreen>

                <StyledPurple>
                  <input
                    type="radio"
                    id={med.med_id}
                    value="false"
                    name={med.med_id}
                  />
                  <label htmlFor={med.med_id}>
                    Remind me later
                    <FontAwesomeIcon
                      className="iconTime"
                      size="lg"
                      icon={faHourglass}
                    />
                  </label>
                </StyledPurple>

                <StyledYellow>
                  <input
                    type="radio"
                    id={med.med_id}
                    value="false"
                    name={med.med_id}
                  />
                  <label htmlFor={med.med_id}>
                    Not taken today
                    <FontAwesomeIcon
                      className="iconTime"
                      size="lg"
                      icon={faCircleXmark}
                    />
                  </label>
                </StyledYellow>
              </fieldset>
            ))}
          </StyledInputBox>
          <StyledButton type="submit">Save</StyledButton>
        </StyledForm>
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
