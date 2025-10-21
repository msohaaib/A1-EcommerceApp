import mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (option) => {
  const mailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "EcommerceApp",
      link: "http://www.ecommerceapp.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(option.mailGenContent);
  const emailHtml = mailGenerator.generate(option.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "msohaib55@outlook.com",
    to: option.email,
    subject: option.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("Email Service Failed", error);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to EcommerceApp! We're excited to have you on board.",
      action: {
        instruction: "To verify your email please click on the button below",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have Question just reply to this email, we'd love to help.",
    },
  };
};
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account",
      action: {
        instruction: "To reset your password please click on the button below",
        button: {
          color: "#224bbc",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have Question just reply to this email, we'd love to help.",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
