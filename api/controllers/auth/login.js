module.exports = {
  friendlyName: "Login",

  description: "Login auth.",

  inputs: {
    emailAddress: {
      type: "string",
      required: true,
      isEmail: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully Logged in User",
    },
    badCombo: {
      description: `The provided email and password combination does not
        match any user in the database.`,
      responseType: "invalidCredentials",
    },
  },

  fn: async function ({ emailAddress, password }) {
    const { res } = this;

    const userRecord = await User.findOne({
      emailAddress: emailAddress.toLowerCase(),
    });

    if (!userRecord) {
      throw "badCombo";
    }

    await sails.helpers.passwords
      .checkPassword(password, userRecord.password)
      .intercept("incorrect", "badCombo");

    const today = new Date();

    // Update last login date
    await User.updateOne({ id: userRecord.id }).set({
      lastLoggedInAt: today.getTime,
    });

    return res.status(200).json({
      message: "User Logged in successfully",
      token: jwt.sign({ user: userRecord.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      }),
    });
  },
};
