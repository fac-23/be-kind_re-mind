import Cookies from "cookies";
import { deleteCurrSession } from "../../database/model";

export default async function log_in(req, res) {
  switch (req.method) {
    case "POST": {
      const sid = req.cookies.sid;
      deleteCurrSession(sid);

      const cookies = new Cookies(req, res);
      //delete any existng cookie
      cookies.set("sid");
      res.redirect(303, "/");
      break;
    }
    default:
      res.status(405).send("Method not allowed");
      break;
  }
}
