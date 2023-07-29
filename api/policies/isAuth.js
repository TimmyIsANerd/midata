const jwt = require("jsonwebtoken");

module.exports = (req, res, proceed) => {
  if (req.header("authorization")) {
    var token = req.header("authorization").split("Bearer ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "No Token Provided" });
    }

    return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res
          .status(401)
          .json({ error: "Unauthorized", message: "Invalid/Expired Token" });
      }

      if (!payload.user) {
        return res.status(401).json({
          error: "Unauthorized",
          message: "No User ID present in Token",
        });
      }

      const user = await User.findOne({ id: payload.user });

      req.user = user;
      return proceed();
    });
  }

  return res.status(401).json({
    error: "Unauthorized",
    message: "No Authorization Header Present",
  })
};
