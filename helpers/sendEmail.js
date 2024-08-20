import sgMail from "@sendgrid/mail";
import "dotenv/config";

const { SENDGRID_API_KEY, MY_EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (data) => {
  console.log("data", data);
  const email = { ...data, from: MY_EMAIL_FROM };
  await sgMail.send(email);
  return true;
};

// const email = {
//   to: "yexinic766@iteradev.com",
//   from: "viculyak@gmail.com",
//   subject: "test email 5",
//   html: "<p>test email text 5</p>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("succeed sending 5"))
//   .catch((error) => console.log(error));
