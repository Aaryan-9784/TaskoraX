const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const sendEmail = require('../services/emailService');

exports.getAllTeamMembers = catchAsync(async (req, res, next) => {
  // In a real app, this might be restricted to a specific organization or workspace.
  // For now, we return active users as "team members".
  const members = await User.find({ isActive: { $ne: false } }).select('-__v -passwordResetExpires -passwordResetToken');

  res.status(200).json({
    status: 'success',
    results: members.length,
    data: {
      members,
    },
  });
});

exports.updateTeamMember = catchAsync(async (req, res, next) => {
  const isAdminOrManager = ['admin', 'Admin', 'manager', 'Manager'].includes(req.user.role);
  
  // If non-admin/manager tries to update another user, forbid it
  if (!isAdminOrManager && req.user.id !== req.params.id) {
    return next(new AppError('You do not have permission to update other team members', 403));
  }

  // Non-admins cannot modify roles
  if (req.body.role && !isAdminOrManager) {
    return next(new AppError('Only administrators and managers can change user roles', 403));
  }

  const allowedFields = isAdminOrManager 
    ? ['role', 'department', 'status'] 
    : ['department', 'status'];
  
  const updateData = {};
  Object.keys(req.body).forEach(el => {
    if (allowedFields.includes(el)) updateData[el] = req.body[el];
  });

  const member = await User.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  }).select('-__v -passwordResetExpires -passwordResetToken');

  if (!member) {
    return next(new AppError('No member found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      member,
    },
  });
});

exports.inviteTeamMember = catchAsync(async (req, res, next) => {
  const { email, name, role, projectName, projectId, memberId } = req.body;

  if (!email || !name) {
    return next(new AppError('Please provide email and name', 400));
  }

  const acceptLink = `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/team/invite/accept/${projectId}/${memberId}`;

  const subject = `Invitation to join project: ${projectName || 'TaskoraX'}`;
  const html = `
    <div style="font-family: sans-serif; padding: 20px; color: #333;">
      <h2>Hi ${name},</h2>
      <p>You have been invited to join the project "<strong>${projectName || 'TaskoraX'}</strong>" as a <strong>${role || 'Member'}</strong>.</p>
      <div style="margin: 30px 0;">
        <a href="${acceptLink}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Approve Invitation</a>
      </div>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${acceptLink}">${acceptLink}</a></p>
      <br>
      <p>Thanks,</p>
      <p>TaskoraX Team</p>
    </div>
  `;

  try {
    await sendEmail({
      email,
      subject,
      html,
      message: `Hi ${name},\n\nYou have been invited to join the project "${projectName || 'TaskoraX'}" as a ${role || 'Member'}.\n\nPlease log in to TaskoraX to approve your invitation and join the team.\n\nThanks,\nTaskoraX Team`
    });

    res.status(200).json({
      status: 'success',
      message: 'Invitation sent successfully'
    });
  } catch (err) {
    return next(new AppError('There was an error sending the email. Try again later!', 500));
  }
});

exports.acceptInvitation = catchAsync(async (req, res, next) => {
  const { projectId, memberId } = req.params;
  const Project = require('../models/Project');

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).send('Project not found');
  }

  let memberFound = false;
  if (project.pendingTeam && project.pendingTeam.length > 0) {
    project.pendingTeam = project.pendingTeam.map(m => {
      if (m.id === memberId) {
        memberFound = true;
        return { ...m, status: 'Online' };
      }
      return m;
    });
  }

  if (memberFound) {
    // Save to trigger MongoDB to persist the changes
    await project.save();
  }

  // Redirect the recipient to the frontend project page
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/projects/${projectId}`);
});
