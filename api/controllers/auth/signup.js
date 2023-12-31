const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Signup",

  description: "Signup auth.",

  inputs: {
    firstName: {
      type: "string",
      required: true,
      description: "First Name of the user",
    },
    lastName: {
      type: "string",
      required: true,
      description: "Last Name of the user",
    },
    emailAddress: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
      description: "Email Address of the user",
    },
    password: {
      type: "string",
      required: true,
      description: "Password of the user",
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "Successfully created New User",
    },
    emailAlreadyInUse: {
      statusCode: 409,
      responseType: "emailAlreadyInUse",
      description: "The provided email address / username is already in use.",
    },
    invalid: {
      responseType: "badRequest",
      description:
        "The provided fullName, password and/or email address are invalid.",
      extendedDescription:
        "If this request was sent from a graphical user interface, the request " +
        "parameters should have been validated/coerced _before_ they were sent.",
    },
  },

  fn: async function ({ firstName, lastName, emailAddress, password }) {
    const { req, res } = this;

    if (password.length < 8) {
      return res.badRequest({
        message: "Password Length is less than 8 characters",
      });
    }

    // Create User Account
    let newUser = await User.create({
      firstName,
      lastName,
      emailAddress: emailAddress.toLowerCase(),
      password: await sails.helpers.passwords.hashPassword(password),
      emailProofToken: await sails.helpers.strings.random("url-friendly"),
      emailProofTokenExpiresAt:
        Date.now() + sails.config.custom.emailProofTokenTTL,
      tosIp: req.ip,
      isAdmin: true,
    })
      .intercept("E_UNIQUE", "emailAlreadyInUse")
      .intercept({ name: "UsageError" }, "invalid")
      .fetch();

    if (!newUser) {
      return res.serverError({ message: "Unable to create user" });
    }

    if (sails.config.custom.emailConfirmation) {
      try {
        const FEBaseURL = await sails.config.custom.FEBaseURL;

        const emailBody = await sails.renderView("emails/verification/email", {
          layout: false,
          verificationLink: `${FEBaseURL}/email/verify/${newUser.emailProofToken}`,
        });

        await sails.helpers.sendEmail(
          newUser.emailAddress,
          "MiData | Email Verification",
          emailBody
        );
      } catch (error) {
        sails.log.error(error);
      }
    }

    return res.status(201).json({
      message: "User Created Successfully",
      token: jwt.sign(
        {
          user: newUser.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      ),
    });
  },
};
