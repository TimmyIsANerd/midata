module.exports = {
  friendlyName: "Resend email Verification",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const { req, res } = this;

    const { user } = req;

    const newToken = await sails.helpers.strings.random("url-friendly");

    await User.updateOne({ id: user.id }).set({
      emailProofToken: newToken,
      emailProofTokenExpiresAt:
        Date.now() + sails.config.custom.emailProofTokenTTL,
    });

    // @todo implement email delivery

    res.status(200).json({
      message: "Successfully sent new email verification token",
    });
  },
};
