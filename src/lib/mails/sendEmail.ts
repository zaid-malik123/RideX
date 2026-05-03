import transport from "./transport";

export const sendMail = async (
  to: string,
  subject: string,
  html: string
) => {
  try {
    await transport.sendMail({
      from: `"RYDEX <${process.env.EMAIL_USER}>"`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log("Mail error:", error);
    throw new Error("Failed to send email");
  }
};