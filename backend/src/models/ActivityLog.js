const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        'User Login',
        'User Registration',
        'User Update',
        'User Delete',
        'User Reactivation',
        'Task Create',
        'Task Update',
        'Task Delete',
        'Project Create',
        'Project Update',
        'Project Delete',
        'Role Change',
        'Other',
      ],
    },
    ip: {
      type: String,
      default: null,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Indexing for faster queries (dashboard analytics and logs table)
activityLogSchema.index({ user: 1, action: 1 });
activityLogSchema.index({ createdAt: -1 });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
