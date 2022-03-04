import { addToMedicationlist, getSessionInfo } from "../../database/model";
import Cookies from "cookies";

export default async function handler(req, res) {
  console.log(req);
  const cookies = new Cookies(req, res);
  const sid = cookies.get("sid").split(",")[0];
  const userData = await getSessionInfo(sid);
  const user_id = JSON.parse(userData.data).user_id;

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

  addToMedicationlist(
    user_id,
    medicationType,
    medName,
    units,
    medDose,
    medTime,
    tabCount,
    customTime,
    notes
  );

  res.status(200).redirect("/medication");
}
