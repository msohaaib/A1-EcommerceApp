import mailgen from "mailgen";

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
