const jwt = require("jsonwebtoken");
const multer = require("multer");
module.exports = {
  generateToken,
  restrictedMiddleware,
};

function generateToken(user) {
  // header payload and verify signature
  // payload -> username, id, department, expiration date
  // verify signature -> a secret
  // console.log(user);
  const payload = {
    sub: user.id,
    username: user.username,
    accountType: user.accountType,
    email: user.email,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function restrictedMiddleware(req, res, next) {
  const token = req.headers.authorization;

  // see if there is a token
  // check if it is vaild =>
  //    rehash the header + payload + secret and see if it matches our verify signature

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("failed verify", err);
        res.status(401).json({
          message: "token not verified",
        });
      } else {
        // token is valid
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: "no token provided",
    });
  }
}
