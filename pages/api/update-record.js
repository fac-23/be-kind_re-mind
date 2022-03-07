import { updateTaken } from "../../database/model";

function awaitAll(array, asyncFn) {
  const promises = [];
  array.forEach((x) => {
    promises.push(asyncFn(x));
  });
  return Promise.all(promises);
}

export default async function handler(req, res) {
  // turn req.body object into an array of arrays with med_id and taken boolean value
  const dbEntries = Object.entries(req.body);

  // filter out values so only true values are updated
  const takenEntries = dbEntries.filter((entry) => {
    return entry[1] === "true";
  });

  // call await all function which creates an array of promises to call the the SQL query for each item in the array
  awaitAll(takenEntries, updateTaken);

  res.status(200).redirect("/home");
}
