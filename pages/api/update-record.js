//new Date().toISOString().slice(0, 19).replace("T", " ");
export default async function handler(req, res) {
  const { taken } = req.body;
  console.log("taken", taken);
  console.log("req.body", req.body);

  res.status(200).redirect("/home");
}
