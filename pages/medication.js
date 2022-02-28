import MedicineBox from "../components/medicineBox.jsx";
import Layout from "../components/layout.js";
import MedicationForm from "../components/medicationForm.jsx";

export default function MedicationPage() {
  return (
    <div>
      <Layout>
        <MedicineBox
          medicineObj={{ drug: "Ramipril", remaining: 7, total: 28 }}
        ></MedicineBox>
        <button type="submit">Add Medicine</button>
        <MedicationForm></MedicationForm>
      </Layout>
    </div>
  );
}
