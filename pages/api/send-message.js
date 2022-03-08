export default async function send_message(req, res) {
  switch (req.method) {
    case "POST": {
      const accountSid = process.env.TWILIO_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;

      const twilio = require("twilio");
      const client = new twilio(accountSid, authToken);

      client.messages
        .create({
          body: "Hello from Node",
          to: process.env.DEV_NUM,
          from: process.env.TWILIO_PHONE_NUM,
        })
        .then((message) => {
          console.log(message.sid);
          res.redirect(303, "/home");
        })
        .catch((error) => {
          console.log(error);
        });

      res.redirect(303, "/home");
    }
  }
}
