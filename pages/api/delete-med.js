import { deleteMed } from "../../database/model";

export default async function deleteHandler(req, res) {
  const { id } = req.body;

  const deleted = await deleteMed(id);
  console.log({ deleted });

  res.status(200).redirect("/medication");
}
