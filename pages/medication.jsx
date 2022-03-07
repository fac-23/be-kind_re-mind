import MedicineBox from "../components/medicineBox.jsx";
import Layout from "../components/layout";
import Image from "next/image";
import MedicationForm from "../components/medicationForm.jsx";
import { useState } from "react";
import { getAllMeds } from "../database/model";
import { getSessionInfo } from "../database/model";

export async function getServerSideProps({ req, res }) {
  const userData = await getSessionInfo(req.cookies.sid);
  const user_id = JSON.parse(userData.data).user_id;

  const medicationInfo = await getAllMeds(user_id);

  console.log(medicationInfo);
  return {
    props: {
      medicationInfo,
    },
  };
}

export default function MedicationPage({ medicationInfo }) {
  const [formOpen, setFormOpen] = useState(false);
  function handleClick() {
    setFormOpen((prevState) => !prevState);
  }
  return (
    <div>
      <Layout>
        <button className="button" type="submit" onClick={handleClick}>
          {!formOpen && <>Add Medicines</>}
          {formOpen && <>Hide form</>}
        </button>
        {formOpen === true && <MedicationForm></MedicationForm>}

        <MedicineBox
          medicineObj={{ drug: "Ramipril", remaining: 7, total: 28 }}
          medicationInfo={medicationInfo}
        ></MedicineBox>
      </Layout>
    </div>
  );
}
