const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    username: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    occupation: {
      type: String,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
    githubId: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ['Admin', 'Manager', 'User', 'admin', 'manager', 'user'],
      default: 'user',
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      default: null,
    },
    department: {
      type: String,
      default: 'General',
    },
    status: {
      type: String,
      enum: ['Online', 'Offline', 'Busy', 'Away', 'Pending'],
      default: 'Offline',
    },
    skills: {
      type: [String],
      default: [],
    },
    assignedTasks: {
      type: Number,
      default: 0,
    },
    completedTasks: {
      type: Number,
      default: 0,
    },
    pendingTasks: {
      type: Number,
      default: 0,
    },
    productivityScore: {
      type: Number,
      default: 0,
    },
    workloadPercentage: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      maxlength: [250, 'Bio cannot be more than 250 characters'],
    },
    preferences: {
      theme: {
        type: String,
        enum: ['Light', 'Dark', 'System'],
        default: 'Light',
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: false },
        taskReminders: { type: Boolean, default: true },
        projectUpdates: { type: Boolean, default: true },
        teamMentions: { type: Boolean, default: true },
        weeklyDigest: { type: Boolean, default: true },
        marketing: { type: Boolean, default: false },
        schedule: {
          type: String,
          enum: ['always', 'batched', 'quiet'],
          default: 'always',
        },
      },
      timezone: {
        type: String,
        default: 'UTC',
      },
      language: {
        type: String,
        default: 'en',
      },
    },
    is2FAEnabled: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
    sessions: [
      {
        token: { type: String, select: false },
        device: String,
        os: String,
        browser: String,
        ip: String,
        lastActive: { type: Date, default: Date.now },
      }
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// Instance method to check if password is correct
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  if (!userPassword) return false;
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Generate and hash password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
