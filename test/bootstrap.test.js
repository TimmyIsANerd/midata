var Sails = require("sails");

before(function (done) {
  this.timeout(120000);

  Sails.lift(
    {
      log: {
        level: "error",
      },
    },
    (err) => {
      if (err) {
        return done(err);
      } else {
        return done();
      }
    }
  );
});


after((done) =>{
    Sails.lower(done);
})