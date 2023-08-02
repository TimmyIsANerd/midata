const { isBefore } = require("date-fns");

module.exports = {
  friendlyName: "Email",

  description: "Email verification using token.",

  inputs: {},

  exits: {},

  fn: async function () {
    const { req, res } = this;

    const { token } = req.params;

    const userRecord = await User.findOne({ emailProofToken: token });

    if (!userRecord) {
      return res.badRequest({
        message:
          "Invalid verification link. Please request a new verification email.",
      });
    }

    if (userRecord.emailVerificationStatus === "Verified") {
      return res.badRequest({
        message:
          "Resource has already been updated and cannot be updated again.",
      });
    }

    const today = new Date();
    const expiryDate = new Date(userRecord.emailProofTokenExpiresAt);

    if (isBefore(expiryDate, today)) {
      return res.badRequest({
        message:
          "Verification link expired. Please request a new verification email.",
      });
    }

    const updatedRecord = await User.updateOne({
      emailProofToken: token,
    }).set({
      emailVerificationStatus: "Verified",
      emailProofToken: "",
      emailProofTokenExpiresAt: 0,
    });

    if (!updatedRecord) {
      return res.recordUpdateFailed("Failed to Update User & Verify Account");
    }

    // @todo implement email successfully verified delivery

    return res.status(200).json({
      message: "Email Account verification successful. You may now log in.",
      data: { emailAddress: userRecord.emailAddress },
    });
  },
};
