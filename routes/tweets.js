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

// returning a partial of tweets
exports.more = function(req, res) {
  getTweets(function (tweets) {
    res.render('_tweets', {tweets:tweets});
  });
};

// main page
exports.list = function(req, res){
  console.log("user", req.session.user);
  getTweets(function (tweets) {
    console.log("tweets", tweets);
    res.render('tweets', {tweets:tweets, 
        logged_in: req.session.user ? true : false});
  });
};

// helpers
function getTweets (next) {
  Tweet.find().sort("created").limit(20).exec(
    function (err, tweets) {
      if (err)
        return console.log("can't find tweets", err);
      next(tweets);
    }
  );
}
