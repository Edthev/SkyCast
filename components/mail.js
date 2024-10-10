const nodemailer = require("nodemailer");

const mail = async (API_KEY, RECEIVER, SENDER, SUBJECT, HTML) => {
   const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
         user: "apikey",
         pass: API_KEY,
      },
   });
   const main = async () => {
      const info = await transporter.sendMail({
         from: SENDER,
         to: RECEIVER,
         subject: SUBJECT,
         html: HTML,
      });
      const timestamp = new Date();
      console.log("Message sent: %s", info.messageId, timestamp);
   };
   try {
      await main();
   } catch (err) {
      console.log(err);
   }
};
module.exports = mail;
