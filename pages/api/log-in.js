import { verifyUser, saveSession, cookie_options } from "../../auth";
import bcrypt from "bcryptjs";

export default async function log_in(req, res) {
  switch (req.method) {
    case "POST": {
      const { email, password } = req.body;
      //calls verifyUser in auth - which sends a query to db to return user with the same email
      const user = await verifyUser(email, password);
      console.log("verified user in log in", user);
      // in auth save session creates SID and calls createSession in model
      const sid = await saveSession({ user_id: user[0].id });

      console.log(sid);
      res.setHeader("set-cookie", `sid=${sid}; ${cookie_options}`);
      res.redirect(303, "/home");
      break;
    }
    default:
      res.status(405).send("Method not allowed");
      break;
  }
}

// verifiedUser {
//   id: 2,
//   username: 'olij',
//   email: 'oli@oli.com',
//   phone: '076664535',
//   password: '123'
// }
