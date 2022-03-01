import MedicineBox from "../components/medicineBox.jsx";
import Layout from "../components/layout";
import MedicationForm from "../components/medicationForm.jsx";

export default function MedicationPage() {
  return (
    <div>
      <Layout>
        <MedicineBox
          medicineObj={{ drug: "Ramipril", remaining: 7, total: 28 }}
        ></MedicineBox>
        <MedicationForm></MedicationForm>
      </Layout>
    </div>
  );
}
