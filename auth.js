import { createSession } from "./database/model";
import crypto from "node:crypto";

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
