import { updateTaken } from "../../database/model";

function awaitAll(list, asyncFn) {
  const promises = [];
  list.forEach((x) => {
    promises.push(asyncFn(x));
  });
  return Promise.all(promises);
}

export default async function handler(req, res) {
  //const { taken } = req.body;
  //console.log("taken", taken);
  console.log("req.body", req.body);
  const med_idKeys = Object.keys(req.body);
  const takenValues = Object.values(req.body);
  const dbEntries = Object.entries(req.body);

  //console.log(med_idKeys, takenValues);
  // for await (const key of med_idKeys) {
  //   console.log(key, "key");
  // }
  awaitAll(dbEntries, updateTaken);

  //Promise.all([]);
  //updateTaken(med_idKeys, takenValues);
  res.status(200).redirect("/home");
}
