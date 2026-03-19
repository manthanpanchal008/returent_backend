const nodemailer = require('nodemailer');


const sendEmail = async(email,otp) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PASSWORD, // app password
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_ID,
        to: email,
        subject: "OTP Verification",
        html: `<h2>Your OTP is: ${otp}</h2>`,
      };
    //   mzfu nggs ignf ovvt
      await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;