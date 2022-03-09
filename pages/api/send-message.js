import { getAllMeds } from "../../database/model";

export default async function send_message(req, res) {
  const ACTION_KEY = req.headers.action_key;

  switch (req.method) {
    case "GET": {
      if (ACTION_KEY === process.env.APP_KEY) {
        const record = await getAllMeds(1);

        const dailySchedule = record.map((obj) => {
          return obj.medtime;
        });

        console.log("array of time", dailySchedule);

        // break down daily schedule into 2 digit num

        let formatedDailySchedule = dailySchedule.map((time) => {
          const split = time.split(":");
          const hour = parseInt(split[0]);
          return hour;
          // [13, 15, 18]
        });
        console.log("line 23", formatedDailySchedule);

        // get current date using get.date/hours

        let currentTime = new Date().getHours();
        // console.log("time", parseInt(currentTime));

        if (formatedDailySchedule.includes(currentTime)) {
          const accountSid = process.env.TWILIO_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;

          const twilio = require("twilio");
          const client = new twilio(accountSid, authToken);

          client.messages
            .create({
              body: "You have a medication reminder from Be-Kind Re-Mind Visit: https://be-kind-re-mind-ten.vercel.app/home",
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
      }

      res.status(200).send(`Status 200`);
    }
  }
}
