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
  checkRecord,
} from "../database/model";

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

  const checkRecords = await checkRecord(user_id, cleanDate);
  //function to create new row in DB with today's date

  if (checkRecords === false) {
    awaitAll(newRowArray, newRecordRow);
  }

  const allFails = await getStreak(1);

  const notTodayFails = allFails.filter((dateKVP) => {
    const cleanDate = JSON.stringify(dateKVP.date).slice(1, 11);
    const today = new Date();
    return cleanDate !== JSON.stringify(today).slice(1, 11);
  });

  const lastFail = JSON.stringify(notTodayFails[0].date).slice(1, 11);
  console.log("lastFail", lastFail);

  const date1 = new Date(lastFail);
  const date2 = new Date();

  // To calculate the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  const streak = Math.floor(Difference_In_Days);

  return {
    props: {
      username,
      email,
      phone,
      streak,
    },
  };
}

export default function Home({ username, streak }) {
  return (
    <div>
      <Layout home>
        <h1>Home</h1>
        <DisplayName name={`"${username}"`}></DisplayName>
        <CurrentStreak currentStreak={streak}></CurrentStreak>
        <AlertBox></AlertBox>
        <MedicationChecklist></MedicationChecklist>
        <MedicineBox
          medicineObj={{ drug: "Ramipril", remaining: 7, total: 28 }}
        ></MedicineBox>
        <RewardBox></RewardBox>
      </Layout>
    </div>
  );
}
