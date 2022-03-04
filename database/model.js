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
    console.log(result.rows);
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
