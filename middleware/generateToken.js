const jwt = require('jsonwebtoken');

function generateToken(user) {
    // header payload and verify signature
    // payload -> username, id, department, expiration date
    // verify signature -> a secret
    // console.log(user);
    const payload = {
      sub: user.id,
      username: user.username,
      accountType: user.accountType,
    };
    
    const options = {
      expiresIn: '1d',
    };
  
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }

module.exports = generateToken 