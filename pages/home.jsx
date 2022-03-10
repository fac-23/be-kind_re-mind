import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import MedicationChecklist from "../components/medicationChecklist";
import DisplayName from "../components/displayName";
import CurrentStreak from "../components/currentStreak";
import RewardBox from "../components/rewardBox";
import MedicineBox from "../components/medicineBox";
import AlertBox from "../components/alertBox";
import {
  getSessionInfo,
  getContactInfo,
  getStreak,
  getAllMeds,
  newRecordRow,
  retrieveAllMedDetails,
  collectTodaysRecords,
} from "../database/model";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const StyledDiv = styled.div`
color: var(--color-two);
font-size: 1.5rem;
font-family: var(--heading-font);
display: inline-block;
margin: 1rem;

@media only screen and (min-width: 560px) {
  div {
  font-size: 2.4rem;
  }
`;

const StyledStreak = styled.div`
background: var(--color-one);
margin: 0 1rem;
font-size: 1rem;
font-family: var(--heading-font);
color: white;
padding: 0.5rem;
border-radius: 5px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

p {
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
margin: 0.25rem;
}


@media only screen and (min-width: 560px) {
  div {
  font-size: 1.6rem;
  }
  p {
    padding: 1rem;
  }

`;

const StyledAlert = styled.div`
  background: #dc143c;
  margin: 0.5rem 1rem;
  font-family: var(--heading-font);
  color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 1rem;

  h2 {
    font-family: var(--heading-font);
    font-size: 1rem;
    margin: 0.25rem;
  }

  p {
    font-size: 1rem;
    margin: 0.25rem;
    padding: 0.5rem;
  }

  @media only screen and (min-width: 560px) {
    p, h2 {
      font-size: 1.6rem;
      padding: 0.5rem 2rem;
    }
`;

const StyledRewards = styled.div`
  background: var(--color-two);
  margin: 0 1rem;
  font-family: var(--heading-font);
  color: white;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;


  h2 {
    font-family: var(--heading-font);
    font-size: 1rem;
    margin: 0.25rem;
  }

  p {
    font-size: 1rem;
    margin: 0.25rem;
  }
   
  @media only screen and (min-width: 560px) {
    h2 {
      font-size: 1.8rem;
      
    }
    p {
      font-size: 1.6rem;
      
    }
`;

const StyledMeds = styled.div`
  background: var(--color-three);
  margin: 1rem;
  font-family: var(--heading-font);
  color: white;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  li {
    font-size: 1rem;
    margin: 0.25rem 0;
  }

  ul {
    margin: 0;
  }
 

  h3 {
    font-family: var(--heading-font);
    font-size: 1rem;
    margin: 0.25rem;
  }
   
  @media only screen and (min-width: 560px) {
    h3 {
      font-size:1.8rem;
    }
    li {
      font-size: 1.6rem;
    }
`;

export async function getServerSideProps({ req }) {
  const userData = await getSessionInfo(req.cookies.sid);
  const user_id = JSON.parse(userData.data).user_id;
  const contactInfo = await getContactInfo(user_id);
  const username = contactInfo.username;
  const email = contactInfo.email;
  const phone = contactInfo.phone;

  //create and clean date for creating new row in record table
  const todayDate = new Date();
  const cleanDate = JSON.stringify(todayDate).slice(1, 11);

  // query db and return med_id's linked to that user_id
  const medArray = await getAllMeds(user_id);
  const newRowArray = medArray.map((meds) => {
    return [cleanDate, user_id, meds.id];
  });

  //Promise all function
  function awaitAll(array, asyncFn) {
    const promises = [];
    array.forEach((x) => {
      promises.push(asyncFn(x));
    });
    return Promise.all(promises);
  }

  const todaysRecords = await collectTodaysRecords(user_id, cleanDate);

  const existingRecordForToday = todaysRecords.length > 0 ? true : false;
  //function returns medicine details for todays scheduled medicines
  //if there are none scheduled, update record with new entries for each medicine
  //it only runs once a day
  if (existingRecordForToday === false) {
    awaitAll(newRowArray, newRecordRow);
  }

  const allFails = await getStreak(1);

  const notTodayFails = allFails.filter((dateKVP) => {
    const cleanDate = JSON.stringify(dateKVP.date).slice(1, 11);
    const today = new Date();
    return cleanDate !== JSON.stringify(today).slice(1, 11);
  });

  const lastFail = JSON.stringify(notTodayFails[0].date).slice(1, 11);

  const date1 = new Date(lastFail);
  const date2 = new Date();

  // To calculate the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  const streak = Math.floor(Difference_In_Days);

  //for display on homepage
  const allMedDetails = await retrieveAllMedDetails(user_id);

  console.log("allMEdDetails", allMedDetails);
  const showDaily = allMedDetails.map((record) => {
    return { name: record.medname, taken: record.taken };
  });

  console.log(showDaily);

  return {
    props: {
      username,
      email,
      phone,
      streak,
      showDaily,
    },
  };
}

export default function Home({ username, streak, showDaily }) {
  return (
    <div>
      <Layout home>
        <StyledDiv>
          <DisplayName name={`${username}`}></DisplayName>
        </StyledDiv>
        <StyledStreak>
          <CurrentStreak currentStreak={streak}></CurrentStreak>
        </StyledStreak>
        <StyledAlert>
          {showDaily.some((element) => {
            element.taken === false;
          }) && <AlertBox></AlertBox>}
        </StyledAlert>
        <StyledMeds>
          <MedicationChecklist showDaily={showDaily}></MedicationChecklist>
        </StyledMeds>
        <StyledRewards>
          <RewardBox></RewardBox>
        </StyledRewards>
      </Layout>
    </div>
  );
}
