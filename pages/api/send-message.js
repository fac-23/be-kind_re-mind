import { getAllMeds } from "../../database/model";

export default async function send_message(req, res) {
  switch (req.method) {
    case "GET": {
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
      console.log("line 23", formatedDailySchedule);

      formatedDailySchedule = [13, 16, 17];
      console.log("line 25", formatedDailySchedule);

      // get current date using get.date/hours

      let currentTime = new Date().getHours();
      console.log("time", parseInt(currentTime));

      if (formatedDailySchedule.includes(currentTime)) {
        const accountSid = process.env.TWILIO_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        const twilio = require("twilio");
        const client = new twilio(accountSid, authToken);

        client.messages
          .create({
            body: "You have a medication reminder from Be-Kind Re-Mind",
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

      // compare and if matching then send twilio

      res.status(200);
    }
  }
}
