var User = require('../models/user.js');
var Tweet = require('../models/tweet.js');

// creating a new tweet
exports.new = function(req, res){
  var user = req.session.user;
  if (!user)
    return console.log("no one is logged in");

  // create the tweet
  var tweet = new Tweet({tweet: req.body.tweet, _creator: user._id});
  tweet.save(function (err) {
    if (err)
      return console.log("couldn't save tweet", err);

    res.send("yay");
  });
};

// main page
exports.list = function(req, res){
  Tweet.find().sort("created").limit(20).exec(
    function (err, tweets) {
      if (err)
        return console.log("can't find tweets", err);

      res.render('tweets', {tweets:tweets, 
        logged_in: req.session.user ? true : false});
    }
  );
};