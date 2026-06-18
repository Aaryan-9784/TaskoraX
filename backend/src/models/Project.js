const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A project must have a name'],
      trim: true,
      maxlength: [100, 'Project name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Planning', 'At Risk', 'Completed', 'On Hold'],
      default: 'Planning',
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    coverColor: {
      type: String,
      default: 'bg-primary-500',
    },
    team: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    pendingTeam: [
      {
        id: String,
        name: String,
        email: String,
        role: String,
        status: String,
        avatar: String,
      }
    ],
    tasks: {
      total: { type: Number, default: 0 },
      completed: { type: Number, default: 0 },
    },
    tasksList: [
      {
        id: String,
        name: String,
        status: String,
        startDay: Number,
        durationDays: Number,
      }
    ],
    files: [
      {
        id: mongoose.Schema.Types.Mixed,
        name: String,
        size: String,
        date: String,
        url: String,
        isImage: Boolean,
      }
    ],
    quickNote: {
      type: String,
      default: '',
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
