module.exports = {
  friendlyName: "Home Route",

  description: "Testing Response for API.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const { req, res } = this;
    const today = new Date();

    return res.send(`MiData is Online at ${today}😊`);
  },
};
