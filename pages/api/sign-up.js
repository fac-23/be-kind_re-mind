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
      const user = await createUser(username, email, phone, hashedPassword);

      //session saved in auth which calls createSession in model
      const sid = await saveSession({ user_id: user.id });

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

//req.body [Object: null prototype] {
//   name: 'Jess',
//   email: 'jess@email',
//   phone: '000000',
//   password: 'password'
// }

// returned from createUser {
//   username: 'Juliette',
//   email: 'juliette.orpen@gmail.com',
//   phone: '07748312234'
// }

//   console.log(
//     "destructured in sign up",
//     username,
//     email,
//     phone,
//     hashedPassword
//   );
