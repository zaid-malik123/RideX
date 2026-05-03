export const signupOtpTemplate = (otp: string) => {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Verify Your Email</h2>
      <h1>${otp}</h1>
      <p>This OTP is valid for 10 minutes</p>
    </div>
  `;
};