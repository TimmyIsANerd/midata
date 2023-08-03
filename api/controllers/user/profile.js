module.exports = {
  friendlyName: "Profile",

  description: "Profile user.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const { req, res } = this;

    const { user } = req;

    if (!user) {
      return res.badRequest({ message: "User Profile not Found" });
    }

    return res.status(200).json(user);
  },
};
