import { deleteMed } from "../../database/model";

export default async function deleteHandler(req, res) {
  console.log("request body", req.body);

  const { id } = req.body;

  console.log("id", id);

  const deleted = await deleteMed(id);
  console.log(deleted);

  res.status(200).redirect("/medication");
}
