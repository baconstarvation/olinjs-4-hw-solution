var mongoose = require('mongoose');

var tweetSchema = mongoose.Schema({
  tweet: String,
  created: new Date(),
  _creator : { type: Schema.Types.ObjectId, ref: 'User' }
});

exports.Tweet = mongoose.model('Tweet', tweetSchema);