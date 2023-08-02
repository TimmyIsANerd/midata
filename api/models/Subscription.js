/**
 * Subscription.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user: {
      model: "user",
    },
    subscriptionPackage: {
      type: "string",
      isIn: ["monthly", "yearly"],
      description: "Subscription Package",
    },
    amountPaid: {
      type: "string",
      description: "Amount User Paid",
    },
    isActive:{
      type:"boolean",
      description:"If Subscription is active"
    }
  },
};
