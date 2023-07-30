/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    emailAddress: {
      type: "string",
      isEmail: true,
      description: "The email address for this user.",
      unique: true,
    },
    
    password: {
      type: "string",
      description: "The password for this user.",
    },

    firstName: {
      type: "string",
      description: "The first name for this user.",
    },

    lastName: {
      type: "string",
      description: "The last name for this user.",
    },

    tosIp: {
      type: "string",
      description: "IP Address that accepted Terms of Service",
    },

    emailVerificationStatus: {
      type: "string",
      description: "Email Verification Status, Unverified/Verified",
      isIn: ["Verified", "Unverified"],
      defaultsTo: "Unverified",
    },

    isAdmin: {
      type: "boolean",
      description: "Whether this user is an admin or not",
      extendedDescription: "If true, this user can access the admin panel.",
      defaultsTo: false,
    },

    emailProofToken: {
      type: "string",
      description:
        "A pseudorandom, probabilistically-unique token for use in our account verification emails.",
    },

    emailProofTokenExpiresAt: {
      type: "number",
      description:
        "A JS timestamp (epoch ms) representing the moment when this user's `emailProofToken` will expire (or 0 if the user currently has no such token).",
      example: 1502844074211,
    },

    passwordResetToken: {
      type: "string",
      description:
        "A unique token used to verify the user's identity when recovering a password.  Expires after 1 use, or after a set amount of time has elapsed.",
    },

    passwordResetTokenExpiresAt: {
      type: "number",
      description:
        "A JS timestamp (epoch ms) representing the moment when this user's `passwordResetToken` will expire (or 0 if the user currently has no such token).",
      example: 1502844074211,
    },

    lastLoggedInAt: {
      type: "string",
      description:
        "A JS timestamp (epoch ms) representing the moment when this user last logged in.",
      example: 1502844074211,
    },
  },
};
