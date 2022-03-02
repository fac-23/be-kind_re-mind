import { cookie_options, saveSession } from "../../auth";
import { createUser } from "../../database/model";
import bcrypt from "bcrypt";

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export default async function sign_up(req, res) {
  //req.method checks the HTTP header method - if it is a POST
  // request line 8 - 16 runs
  switch (req.method) {
    case "POST": {
      //destructured obj from req.body takes form input which is then parsed into the createUser function which adds new user to DB
      const { username, email, phone, password } = req.body;

      // returns hashed password function above
      const hashedPassword = await hashPassword(password);

      const user = await createUser(username, email, phone, hashedPassword);

      //NOT YET REFACTORED
      const sid = await saveSession({ user_id: user.id });
      console.log("sid in sign up", sid);

      res.setHeader("set-cookie", `sid=${sid}; ${cookie_options}`);
      res.status(200).redirect("/home");
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
