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

//   console.log("inside createUser", username, email, phone, hashedPassword);

export function createSession(sid, data) {
  const CREATE_SESSION = `INSERT INTO sessions (sid, data) VALUES ($1, $2) RETURNING sid`;
  return db.query(CREATE_SESSION, [sid, data]).then((result) => {
    return result.rows[0].sid;
  });
}

export function getUser(email, hashedPassword) {
  console.log("getUser args", email, hashedPassword);
  const GET_USER = `SELECT * FROM users WHERE email = $1`;
  return db.query(GET_USER, [email]).then((result) => {
    console.log("get user query", result.rows);
    return result.rows;
  });
}

export function addToMedicationlist(
  medicationType,
  medName,
  units,
  medDose,
  medTime,
  tabCount,
  customTime,
  notes
) {
  const ADD_MED = `INSERT INTO medications (medicationType,
    medName,
    units,
    medDose,
    medTime,
    tabCount,
    customTime,
    notes) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING medicationType,
    medName,
    units,
    medDose,
    medTime,
    tabCount,
    customTime,
    notes`;
  return db
    .query(ADD_MED, [
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
      // console.log("added", result.rows[0]);
      return result.rows[0];
    });
}

export function getAllMeds() {
  const GET_ALL_MEDS = `SELECT * FROM medications`;
  return db.query(GET_ALL_MEDS).then((result) => {
    // console.log("get all meds", result.rows);
    return result.rows;
  });
}


export function deleteMed(id) {
  const DELETE_ITEM = `DELETE FROM medications WHERE id=$1`;
  console.log("id model", id);
  return db.query(DELETE_ITEM, [id]).then((result) => result);
}

export function deleteCurrSession(sid) {
  const DELETE_SESSION = `
    DELETE FROM sessions WHERE sid = $1`;
  return db.query(DELETE_SESSION, [sid]);
}


