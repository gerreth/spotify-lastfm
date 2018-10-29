import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  bands: {
    top: {
      lastfm: [],
      spotify: [],
    },
    similar: {
      lastfm: [],
      spotify: [],
    },
  },
  likes: [],
  dislikes: [],
});

module.exports = mongoose.model('User', userSchema);
