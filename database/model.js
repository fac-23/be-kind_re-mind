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

//SELECT * FROM users WHERE email='oli@oli.com' AND password='123';
