var User = require('../models/user.js');

exports.new = function(req, res){
  // check if a user exists
  User.findOne({name: req.body.name}, function (err, doc) {
    if (err) {
      // create the user 
      var user = new User({name: req.body.name});
      user.save(function (err) {
        if (err) {
          return login(user);
        } else {
          console.log("couldn't create new user", err);
        }
      });
    } else {
      // we already have this user, just log them in
      return login(user);
    }
  });
};

function login (req, res, user){
  req.session.user = user;
  return res.redirect('/');
}