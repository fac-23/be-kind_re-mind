import MedicineBox from "../components/medicineBox.jsx";
import Layout from "../components/layout";
import MedicationForm from "../components/medicationForm.jsx";
import { useState } from "react";
// import { getAllMeds } from "../database/model";

// export async function getServerSideProps() {
//   const medicationInfo = await getAllMeds();
//   console.log("medication info", medicationInfo);
//   return {
//     props: {
//       medicationInfo,
//     },
//   };
// }

export default function MedicationPage() {
  const [formOpen, setFormOpen] = useState(false);
  function handleClick() {
    setFormOpen((prevState) => !prevState);
  }
  return (
    <div>
      <Layout>
        <MedicineBox
          medicineObj={{ drug: "Ramipril", remaining: 7, total: 28 }}
        ></MedicineBox>
        <button type="submit" onClick={handleClick}>
          {!formOpen && <>Add Medicines</>}
          {formOpen && <>Hide form</>}
        </button>
        {formOpen === true && <MedicationForm></MedicationForm>}
      </Layout>
    </div>
  );
}
