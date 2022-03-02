import { addToMedicationlist } from "../../database/model";

export default async function handler(req, res) {
  const {
    medicationType,
    medName,
    units,
    medDose,
    medTime,
    tabCount,
    customTime,
    notes,
  } = req.body;

  console.log(req.body);

  const addedMedications = await addToMedicationlist(
    medicationType,
    medName,
    units,
    medDose,
    medTime,
    tabCount,
    customTime,
    notes
  );

  console.log("added meds", addedMedications);

  res.status(200).redirect("/medication");
}
