const mongoose = require('mongoose');

const RepoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  repoIdentifier: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  lastUpdated: {
    type: Date,
  },
  viewers: {
    type: Number,
  },
  stars: {
    type: Number,
  },
  issues: {
    type: Number,
  },
  commitHistory: {
    type: String,
  },
});

module.exports = Repo = mongoose.model('repo', RepoSchema);
