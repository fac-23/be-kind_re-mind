import { createSession, getUser } from "./database/model";
const crypto = require("crypto");

export const cookie_options = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24,
  sameSite: "strict",
  signed: true,
};

export async function saveSession(data) {
  console.log("auth saveSession", data);
  //create random sid
  const sid = crypto.randomBytes(18).toString("base64");
  //run create session in model.js, which inserts session into db (data and sid)
  return createSession(sid, data);
}

//called in log-in
export async function verifyUser(email, password) {
  const savedUser = await getUser(email);
  return savedUser;
}

// savedUser in verifyUser auth {
//   id: 2,
//   username: 'olij',
//   email: 'oli@oli.com',
//   phone: '076664535',
//   password: '123'
// }
