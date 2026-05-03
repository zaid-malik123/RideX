import { sendMail } from "./sendEmail";
import { signupOtpTemplate } from "./templates/signupOtpTemplate";

export const sendOtpEmail = async (email: string, otp: string) => {
  const subject = "Verify your email";

  const html = signupOtpTemplate(otp);

  await sendMail(email, subject, html);
};