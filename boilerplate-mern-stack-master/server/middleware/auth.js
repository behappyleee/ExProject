const { User } = require('../models/User');

function auth (req, res, next) {
  let token = req.cookies.w_auth;

  User.findByToken(token, function (err, user) {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
