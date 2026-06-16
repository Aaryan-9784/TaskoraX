const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: 'Project',
      default: null,
    },
    task: {
      type: mongoose.Schema.ObjectId,
      ref: 'Task',
      default: null,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Populate user details on every query
activitySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name avatar',
  });
  next();
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
