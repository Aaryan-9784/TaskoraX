const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A task must have a title'],
      trim: true,
      maxlength: [100, 'A task title must have less or equal then 100 characters'],
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: 'Priority is either: Low, Medium, High',
      },
      default: 'Medium',
    },
    status: {
      type: String,
      enum: {
        values: ['Todo', 'In Progress', 'Done'],
        message: 'Status is either: Todo, In Progress, Done',
      },
      default: 'Todo',
    },
    dueDate: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A task must belong to a user'],
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
taskSchema.index({ createdBy: 1, status: 1 });
taskSchema.index({ createdBy: 1, dueDate: 1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
