module.exports = {
  friendlyName: "Upload picture",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const { req, res } = this;

    if(!req.file("avatar")){
      return res.badRequest({message:"No Avatar Image Found in upload"})
    }

    
  },
};
