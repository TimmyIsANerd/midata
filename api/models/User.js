/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    emailAddress:{
      type:'string',
      isEmail:true,
      description:"The email address for this user.",
      unique:true,
    },
    password:{
      type:'string',
      description:"The password for this user.",
    },
    firstName:{
      type:'string',
      description:"The first name for this user.",
    },
    lastName:{
      type:'string',
      description:"The last name for this user.",
    }
  },

};

