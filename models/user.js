var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  tweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }]
});

exports.User = mongoose.model('User', userSchema);