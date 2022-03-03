import { verifyUser, saveSession, cookie_options } from "../../auth";
import bcrypt from "bcryptjs";
import Cookies from "cookies";

export default async function log_in(req, res) {
  switch (req.method) {
    case "POST": {
      const { email, password } = req.body;
      //calls verifyUser in auth - which sends a query to db to return user with the same email
      const user = await verifyUser(email, password);
      console.log("verified user in log in", user);
      // in auth save session creates SID and calls createSession in model
      const sid = await saveSession({ user_id: user[0].id });

      const cookies = new Cookies(req, res);
      cookies.set("sid", `${sid}`, {
        httpOnly: true, // true by default
        maxAge: cookie_options.maxAge,
      });

      res.redirect(303, "/home");
      break;
    }
    default:
      res.status(405).send("Method not allowed");
      break;
  }
}
