module.exports = {
  friendlyName: "Password",

  description: "Password Reset: Set New Password.",

  inputs: {
    newPassword: {
      type: "string",
      required: true,
      description: "New Password",
    },
  },

  exits: {},

  fn: async function ({ newPassword }) {
    const { req, res } = this;

    const { user } = req;

    await User.updateOne({
      id: user.id,
    }).set({
      password: await sails.helpers.passwords.hashPassword(newPassword),
    });

    return res.status(200).json({
      message: "Password Set Successfully",
    });
  },
};
