export default async function send_message(req, res) {
  switch (req.method) {
    case "POST": {
      console.log("fake endpoint reached");
      const { ACTION_KEY } = req.headers.authorization.split(" ")[1];

      try {
        if (ACTION_KEY === process.env.APP_KEY) {
          console.log(ACTION_KEY);
          console.log(process.env.APP_KEY);
          console.log("Ready to send post request");
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
}
