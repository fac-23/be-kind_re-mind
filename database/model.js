import db from "../database/connection";
import bcrypt from "bcryptjs";

export function createUser(username, email, phone, hashedPassword) {
  const INSERT_USER = `INSERT INTO users (username, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING id, username, email, phone`;
  return db
    .query(INSERT_USER, [username, email, phone, hashedPassword])
    .then((result) => {
      return result.rows[0];
    });
}

export function createSession(sid, data) {
  const CREATE_SESSION = `INSERT INTO sessions (sid, data) VALUES ($1, $2) RETURNING sid`;
  return db.query(CREATE_SESSION, [sid, data]).then((result) => {
    return result.rows[0].sid;
  });
}

export function getUser(email, hashedPassword) {
  const GET_USER = `SELECT * FROM users WHERE email = $1`;
  return db.query(GET_USER, [email]).then((result) => {
    return result.rows;
  });
}

export function getContactInfo(user_id) {
  const GET_USER = `SELECT username, email, phone FROM users WHERE id = $1`;
  return db.query(GET_USER, [user_id]).then((result) => {
    return result.rows[0];
  });
}

export function addToMedicationlist(
  user_id,
  medicationType,
  medName,
  units,
  medDose,
  medTime,
  tabCount,
  customTime,
  notes
) {
  const ADD_MED = `INSERT INTO medications (user_id, medicationType,
    medName,
    units,
    medDose,
    medTime,
    tabCount,
    customTime,
    notes) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING user_id, medicationType,
    medName,
    units,
    medDose,
    medTime,
    tabCount,
    customTime,
    notes`;
  return db
    .query(ADD_MED, [
      user_id,
      medicationType,
      medName,
      units,
      medDose,
      medTime,
      tabCount,
      customTime,
      notes,
    ])
    .then((result) => {
      return result.rows[0];
    });
}

export function getAllMeds(user_id) {
  const GET_ALL_MEDS = `SELECT * FROM medications WHERE user_id = $1`;
  return db.query(GET_ALL_MEDS, [user_id]).then((result) => {
    return result.rows;
  });
}

export function retrieveMedDetails(user_id) {
  const RETRIEVE_MEDS = `SELECT * FROM medications INNER JOIN record ON medications.id = record.med_id WHERE record.taken = false AND record.user_id = $1`;
  return db.query(RETRIEVE_MEDS, [user_id]).then((result) => {
    return result.rows;
  });
}

export function retrieveAllMedDetails(user_id) {
  const RETRIEVE_MEDS = `SELECT * FROM medications INNER JOIN record ON medications.id = record.med_id WHERE record.user_id = $1`;
  return db.query(RETRIEVE_MEDS, [user_id]).then((result) => {
    return result.rows;
  });
}

export function deleteMed(id) {
  const DELETE_ITEM = `DELETE FROM medications WHERE id=$1`;
  return db.query(DELETE_ITEM, [id]).then((result) => result);
}

export function deleteCurrSession(sid) {
  const DELETE_SESSION = `
    DELETE FROM sessions WHERE sid = $1`;
  return db.query(DELETE_SESSION, [sid]);
}

export function getSessionInfo(sid) {
  const CURRENT_SESSION = `
    SELECT data FROM sessions WHERE sid = $1`;
  return db
    .query(CURRENT_SESSION, [sid])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => console.log(error));
}

export function getRecord(user_id) {
  const GET_RECORD = `
  SELECT * FROM record WHERE user_id = $1 AND taken = false
  `;
  return db.query(GET_RECORD, [user_id]).then((result) => {
    return result.rows;
  });
}

export function updateTaken(array) {
  // runs sql to update value of taken to true for the filtered array
  const UPDATE_RECORD = `UPDATE record SET taken = true WHERE med_id = $1`;

  return db.query(UPDATE_RECORD, [array[0]]).then((result) => {
    console.log("db updated");
  });
}

export function newRecordRow(date, user_id, med_id) {
  const INSERT_ROW = `INSERT INTO record (date, user_id, med_id, taken) VALUES($1, $2, $3, false)`;
  return db.query(INSERT_ROW, date, user_id, med_id).then((result) => {
    console.log("rows added to db");
  });
}

export function collectTodaysRecords(user_id, today) {
  const CHECK_RECORD = `
  SELECT * FROM record WHERE user_id = $1 AND date = $2
  `;
  return db.query(CHECK_RECORD, [user_id, today]).then((result) => {
    return result.rows;
  });
}

export function getStreak(user_id) {
  const CHECK_STREAK = `SELECT date FROM record WHERE user_id = $1 AND taken = false ORDER BY date DESC`;

  return db.query(CHECK_STREAK, [user_id]).then((result) => {
    return result.rows;
  });
}

export function getFullRecord(user_id) {
  const GET_RECORD = `
  SELECT taken, date FROM record WHERE user_id = $1
  `;
  return db.query(GET_RECORD, [user_id]).then((result) => {
    return result.rows;
  });
}
