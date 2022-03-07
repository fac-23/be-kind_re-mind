import { verifyUser, saveSession, cookie_options } from "../../auth";
import Cookies from "cookies";

export default async function log_in(req, res) {
  switch (req.method) {
    case "POST": {
      const { email, password } = req.body;
      //calls verifyUser in auth - which sends a query to db to return user with the same email
      const user = await verifyUser(email, password);

      if (user) {
        const cookies = new Cookies(req, res);

        //if user already has session, don't save new session
        if (!cookies.get("sid")) {
          // in auth save session creates SID and calls createSession in model
          const sid = await saveSession({ user_id: user[0].id });

          cookies.set("sid", `${sid}`, {
            maxAge: cookie_options.maxAge,
          });
        }

        res.redirect(303, "/home");
      } else {
        res.redirect(303, "/loginError");
      }
      break;
    }
    default:
      res.status(405).send("Method not allowed");
      break;
  }
}
