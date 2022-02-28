import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import MedicationChecklist from "../components/medicationChecklist";
import DisplayName from "../components/displayName";
import CurrentStreak from "../components/currentStreak";
import RewardBox from "../components/rewardBox";
import MedicineBox from "../components/medicineBox";
import AlertBox from "../components/alertBox";

export default function Home() {
  return (
    <div>
      <Layout home>
        <DisplayName name={"Oli"}></DisplayName>
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
