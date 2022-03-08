import { cookie_options, saveSession } from "../../auth";
import { createUser } from "../../database/model";
import bcrypt from "bcryptjs";
import Cookies from "cookies";

export function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export default async function sign_up(req, res) {
  //req.method checks the HTTP header method - if it is a POST
  // request line 8 - 16 runs
  switch (req.method) {
    case "POST": {
      //destructured obj from req.body takes form input which is then
      const { username, email, phone, password } = req.body;

      // returns hashed password function above
      const hashedPassword = await hashPassword(password);

      //user data is parsed into the createUser in Model.js function which adds new user to DB
      const user = await createUser(
        username,
        email,
        phone,
        hashedPassword
      ).catch((error) => {
        console.log(error);
        res.redirect(303, "/emailError");
      });

      if (!user) {
        console.warn(
          "Definitely entered new email? If so query failed due to too many connections."
        );
      }

      //session saved in auth which calls createSession in model
      const sid = await saveSession({ user_id: user.id });

      const cookies = new Cookies(req, res);
      cookies.set("sid", `${sid}`, {
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
