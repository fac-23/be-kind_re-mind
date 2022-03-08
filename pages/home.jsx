import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import MedicationChecklist from "../components/medicationChecklist";
import DisplayName from "../components/displayName";
import CurrentStreak from "../components/currentStreak";
import RewardBox from "../components/rewardBox";
import MedicineBox from "../components/medicineBox";
import AlertBox from "../components/alertBox";
import { getSessionInfo, getContactInfo } from "../database/model";

export async function getServerSideProps({ req }) {
  const userData = await getSessionInfo(req.cookies.sid);
  const user_id = JSON.parse(userData.data).user_id;
  const contactInfo = await getContactInfo(user_id);
  const username = contactInfo.username;
  const email = contactInfo.email;
  const phone = contactInfo.phone;
  return {
    props: {
      username,
      email,
      phone,
    },
  };
}

export default function Home({ username }) {
  return (
    <div>
      <Layout home>
        <h1>Home</h1>
        <DisplayName name={`"${username}"`}></DisplayName>
        <CurrentStreak currentStreak={7}></CurrentStreak>
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
