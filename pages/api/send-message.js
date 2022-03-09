import { getAllMeds } from "../../database/model";

// check header send back matching key
export default async function send_message(req, res) {
  switch (req.method) {
    case "POST": {
      const { ACTION_KEY } = req.headers.authorization.split(" ")[1];

      try {
        if (ACTION_KEY === process.env.APP_KEY) {
          console.log("Ready to send post request");
          const record = await getAllMeds(1);

          const dailySchedule = record.map((obj) => {
            return obj.medtime;
          });

          console.log("array of time", dailySchedule);

          // break down daily schedule into 2 digit num

          let formatedDailySchedule = dailySchedule.map((element) => {
            const split = element.split(":");
            const hour = parseInt(split[0]);
            return hour;
            // [13, 15, 18]
          });

          formatedDailySchedule = [12, 13, 14];

          // get current date using get.date/hours
          let currentTime = new Date().getHours();

          if (formatedDailySchedule.includes(currentTime)) {
            const accountSid = process.env.TWILIO_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;

            const twilio = require("twilio");
            const client = new twilio(accountSid, authToken);

            client.messages
              .create({
                body: "You have a medication reminder from Be-Kind Re-Mind. Visit https://be-kind-re-mind-ten.vercel.app/",
                to: process.env.DEV_NUM,
                from: process.env.TWILIO_PHONE_NUM,
              })
              .then((message) => {
                console.log("message sent", message.sid);
                res.status(200);
              })
              .catch((error) => {
                console.log(error);
              });
          }
          res.status(200).json({ success: "true" });
        } else {
          res.status(401);
        }
      } catch (err) {
        res.status(500);
      }
      res.status(200);
    }
  }

  // compare and if matching then send twilio

  res.status(200);
}
