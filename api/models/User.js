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
  },
};
