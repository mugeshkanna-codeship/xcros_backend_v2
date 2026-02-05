import db from '../models/index.js';
const {
  User,
  Otp,
  Pincode,
  City,
  Package,
  ListingSave,
  ListingVisit,
  ListingSubscriber,
  ReportListing,
  UserProfile,
  UserSettings,
  UserRole,
  UserAuthMethod,
  UserMetadata,
  Country,
  State,
  Role
} = db;

import commonCrudService from '../services/commonCrudService.js';
import rbacService from '../services/rbacService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import moment from 'moment';
import { Op } from 'sequelize';
import logger from '../utils/logger.js';
import { createUser as createCometChatUser } from '../services/cometchat.service.js';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.MESSAGE_SEND_GRID_KEY);

const userController = {
  // Enhanced CRUD operations with RBAC
  createUser: async (req, res) => {
    return commonCrudService.createRecord(User, req, res, 'users');
  },

  updateUser: async (req, res) => {
    return commonCrudService.updateRecord(User, req, res, 'users');
  },

  listUsers: async (req, res) => {
    return commonCrudService.listRecords(User, req, res, 'users', {
      additionalWhere: {},
      includes: [
        { model: UserProfile, as: 'profile' },
        { model: UserRole, as: 'roles', include: [{ model: Role, as: 'role' }] },
        { model: Country, as: 'country' },
        { model: State, as: 'state' },
        { model: City, as: 'city' },
        { model: Pincode, as: 'pincode' }
      ]
    });
  },

  listUsersSSR: async (req, res) => {
    return commonCrudService.listRecordsSSR(User, req, res, 'users', {
      searchFields: ['name', 'email', 'mobile'],
      includes: [
        { model: UserProfile, as: 'profile' },
        { model: UserRole, as: 'roles', include: [{ model: Role, as: 'role' }] },
        { model: Country, as: 'country' },
        { model: State, as: 'state' },
        { model: City, as: 'city' },
        { model: Pincode, as: 'pincode' }
      ]
    });
  },

  getUser: async (req, res) => {
    return commonCrudService.findOneRecord(User, req, res, 'users', {
      includes: [
        { model: UserProfile, as: 'profile' },
        { model: UserSettings, as: 'settings' },
        { model: UserRole, as: 'roles', include: [{ model: Role, as: 'role' }] },
        { model: Country, as: 'country' },
        { model: State, as: 'state' },
        { model: City, as: 'city' },
        { model: Pincode, as: 'pincode' }
      ]
    });
  },

  deleteUser: async (req, res) => {
    return commonCrudService.deleteRecord(User, req, res, 'users');
  },

  // Get current user profile
  getProfile: async (req, res) => {
    try {
      const user = await User.findByPk(req.uid, {
        include: [
          { model: UserProfile, as: 'profile' },
          { model: UserSettings, as: 'settings' },
          { model: UserRole, as: 'roles', include: [{ model: Role, as: 'role' }] },
          { model: Country, as: 'country' },
          { model: State, as: 'state' },
          { model: City, as: 'city' },
          { model: Pincode, as: 'pincode' }
        ]
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Get user permissions
      const permissions = await rbacService.getUserPermissions(req.uid);

      return res.status(200).json({
        success: true,
        data: {
          user,
          permissions
        }
      });

    } catch (error) {
      logger.error('Error getting user profile:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve profile',
        error: error.message
      });
    }
  },

  // Update current user profile
  updateProfile: async (req, res) => {
    try {
      const user = await User.findByPk(req.uid, {
        include: [{ model: UserProfile, as: 'profile' }]
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const updateData = { ...req.body };

      // Hash password if being updated
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 12);
      }

      // Update user basic info
      const userFields = ['name', 'email', 'mobile', 'password'];
      const userUpdateData = {};
      const profileUpdateData = {};

      Object.keys(updateData).forEach(key => {
        if (userFields.includes(key)) {
          userUpdateData[key] = updateData[key];
        } else {
          profileUpdateData[key] = updateData[key];
        }
      });

      if (Object.keys(userUpdateData).length > 0) {
        await user.update(userUpdateData);
      }

      if (Object.keys(profileUpdateData).length > 0) {
        if (user.profile) {
          await user.profile.update(profileUpdateData);
        } else {
          await UserProfile.create({
            userId: req.uid,
            ...profileUpdateData
          });
        }
      }

      logger.info('Profile updated successfully', {
        userId: req.uid
      });

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully'
      });

    } catch (error) {
      logger.error('Error updating profile:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update profile',
        error: error.message
      });
    }
  },

  // Authentication methods
  register: async (req, res) => {
    try {
      const { email, mobile, password, name, role, ...otherData } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { email: email },
            { mobile: mobile }
          ]
        }
      });

      if (existingUser) {
        return res.status(409).json({ message: 'User already exists with this email or mobile' });
      }

      // Check if this is the first user (bootstrap SUPERADMIN)
      const userCount = await User.count();
      let assignedRole = role;

      if (userCount === 0) {
        // First user - automatically make SUPERADMIN
        assignedRole = 'SUPERADMIN';
        console.log('🎯 Creating first SUPERADMIN user');

        // Ensure SUPERADMIN role exists
        let superAdminRole = await Role.findOne({ where: { name: 'SUPERADMIN' } });
        if (!superAdminRole) {
          superAdminRole = await Role.create({
            name: 'SUPERADMIN',
            description: 'Super Administrator with full system access',
            permissions: ['*'],
            isActive: true,
            createdBy: null // System created
          });
          console.log('✅ SUPERADMIN role created');
        }
      } else {
        // Not first user - default to USER role, but check if USER role exists
        assignedRole = role || 'USER';

        // Ensure USER role exists for regular users
        if (assignedRole === 'USER') {
          let userRole = await Role.findOne({ where: { name: 'USER' } });
          if (!userRole) {
            userRole = await Role.create({
              name: 'USER',
              description: 'Regular user with basic access',
              permissions: ['read:own_profile', 'update:own_profile'],
              isActive: true,
              createdBy: null // System created
            });
            console.log('✅ USER role created');
          }
        }

        if (assignedRole !== 'USER') {
          // For self-registration, only allow USER role unless admin is registering
          const canAssignRole = req.uid ? await rbacService.canAssignRoleToUser(req.uid, assignedRole) : false;
          if (req.uid && !canAssignRole) {
            return res.status(403).json({
              message: 'You do not have permission to register users with this role'
            });
          } else if (!req.uid && assignedRole !== 'USER') {
            return res.status(403).json({
              message: 'Self-registration is only allowed for regular users'
            });
          }
        }
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS || 10));

      // Create user
      const userData = {
        email,
        mobile,
        name,
        password: hashedPassword,
        role: assignedRole,
        status: 'ACTIVE',
        ...otherData
      };

      const user = await User.create(userData);

      // Assign role using RBAC system
      const roleRecord = await Role.findOne({ where: { name: assignedRole } });
      if (roleRecord) {
        await UserRole.create({
          userId: user.id,
          roleId: roleRecord.id,
          assignedBy: req.uid || user.id, // Self-assigned if no admin
          isActive: true
        });
      } else {
        console.error(`Role ${assignedRole} not found in database`);
        return res.status(500).json({ message: 'Role assignment failed' });
      }

      // Create user profile
      await UserProfile.create({
        userId: user.id,
        ...otherData
      });

      // Create CometChat user
      try {
        await createCometChatUser({
          uid: user.id.toString(),
          name: user.name,
          email: user.email
        });
      } catch (cometChatError) {
        logger.warn('Failed to create CometChat user:', cometChatError);
        // Don't fail registration if CometChat fails
      }

      // Generate JWT token
      const userPermissions = await rbacService.getUserPermissions(user.id);
      if (!userPermissions) {
        console.error('Failed to get user permissions for user:', user.id);
        return res.status(500).json({ message: 'Failed to generate authentication token' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          mobile: user.mobile,
          role: assignedRole,
          permissions: userPermissions.permissions,
          dataScope: userPermissions.dataScope
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      logger.info('User registered successfully', {
        userId: user.id,
        email: user.email,
        role: assignedRole
      });

      return res.status(201).json({
        message: 'User registered successfully',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: assignedRole,
            status: user.status,
            permissions: userPermissions.permissions,
            dataScope: userPermissions.dataScope
          },
          token
        }
      });
    } catch (error) {
      logger.error('Registration error:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  agentRegister: async (req, res) => {
    try {
      const { email, mobile, name, ...otherData } = req.body;

      // Check if agent already exists
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { email: email },
            { mobile: mobile }
          ]
        }
      });

      if (existingUser) {
        return res.status(409).json({ message: 'Agent already exists with this email or mobile' });
      }

      // Generate temporary password
      const tempPassword = crypto.randomBytes(8).toString('hex');
      const hashedPassword = await bcrypt.hash(tempPassword, Number(process.env.SALT_ROUNDS || 10));

      // Create agent
      const userData = {
        email,
        mobile,
        name,
        password: hashedPassword,
        role: 'AGENT',
        status: 'PENDING_APPROVAL',
        ...otherData
      };

      const agent = await User.create(userData);

      // Create CometChat user
      try {
        await createCometChatUser(agent.id, agent.name || agent.mobile);
        logger.info('CometChat agent created for:', agent.mobile);
      } catch (cometError) {
        logger.error('Failed to create CometChat agent:', cometError.message);
      }

      logger.info('Agent registered successfully', { agentId: agent.id, email: agent.email });

      return res.status(201).json({
        message: 'Agent registered successfully. Temporary password sent to email.',
        data: {
          agent: {
            id: agent.id,
            name: agent.name,
            email: agent.email,
            mobile: agent.mobile,
            role: agent.role,
            status: agent.status
          },
          tempPassword // In production, send this via email instead
        }
      });
    } catch (error) {
      logger.error('Agent registration error:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, mobile, password } = req.body;

      // Validate input - require either email or mobile
      if (!email && !mobile) {
        return res.status(400).json({ message: 'Email or mobile is required' });
      }

      // Find user by email or mobile
      const whereClause = email ? { email } : { mobile };

      const user = await User.findOne({
        where: whereClause,
        include: [
          { model: UserProfile, as: 'profile' },
          { model: UserRole, as: 'roles', include: [{ model: Role, as: 'role' }] }
        ]
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if user is active
      if (user.status !== 'ACTIVE') {
        return res.status(403).json({ message: 'Account is not active' });
      }

      // Update last login
      await user.update({ lastLoginAt: new Date() });

      // Get user permissions and roles
      const userPermissions = await rbacService.getUserPermissions(user.id);
      const activeRole = user.roles.find(role => role.isActive)?.role?.name || user.role;

      // Generate JWT token with enhanced payload
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          mobile: user.mobile,
          role: activeRole,
          permissions: userPermissions.permissions,
          dataScope: userPermissions.dataScope
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      logger.info('User logged in successfully', {
        userId: user.id,
        mobile: user.mobile,
        role: activeRole
      });

      return res.status(200).json({
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: activeRole,
            status: user.status,
            permissions: userPermissions.permissions,
            dataScope: userPermissions.dataScope
          },
          token
        }
      });
    } catch (error) {
      logger.error('Login error:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({
        where: { email },
        include: [
          { model: UserRole, as: 'roles', include: [{ model: Role, as: 'role' }] }
        ]
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if user has admin role using RBAC
      const userPermissions = await rbacService.getUserPermissions(user.id);
      const hasAdminAccess = await rbacService.hasPermission(user.id, 'admin.access');

      if (!hasAdminAccess) {
        return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if user is active
      if (user.status !== 'ACTIVE') {
        return res.status(403).json({ message: 'Account is not active' });
      }

      // Update last login
      await user.update({ lastLoginAt: new Date() });

      // Get active role
      const activeRole = user.roles.find(role => role.isActive)?.role?.name || user.role;

      // Generate JWT token with admin permissions
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: activeRole,
          permissions: userPermissions.permissions,
          dataScope: userPermissions.dataScope
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      logger.info('Admin logged in successfully', {
        userId: user.id,
        email: user.email,
        role: activeRole
      });

      return res.status(200).json({
        message: 'Admin login successful',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: activeRole,
            status: user.status,
            permissions: userPermissions.permissions,
            dataScope: userPermissions.dataScope
          },
          token
        }
      });
    } catch (error) {
      logger.error('Admin login error:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // OTP methods
  sendOtp: async (req, res) => {
    try {
      const { mobile } = req.body;

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Hash OTP for storage
      const hashedOtp = await bcrypt.hash(otp, 10);

      // Save OTP to database
      await Otp.upsert({
        mobile,
        otp: hashedOtp,
        expiresAt: moment().add(10, 'minutes').toDate() // 10 minutes expiry
      });

      // TODO: Send OTP via SMS service
      // For now, return OTP in response (remove in production)
      logger.info('OTP sent successfully', { mobile });

      return res.status(200).json({
        message: 'OTP sent successfully',
        otp: process.env.NODE_ENV === 'development' ? otp : undefined // Remove in production
      });
    } catch (error) {
      logger.error('Send OTP error:', error);
      return res.status(500).json({
        message: 'Failed to send OTP',
        error: error.message
      });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { mobile, otp } = req.body;

      // Find OTP record
      const otpRecord = await Otp.findOne({
        where: { mobile }
      });

      if (!otpRecord) {
        return res.status(400).json({ message: 'OTP not found or expired' });
      }

      // Check if OTP is expired
      if (moment().isAfter(moment(otpRecord.expiresAt))) {
        await otpRecord.destroy();
        return res.status(400).json({ message: 'OTP expired' });
      }

      // Verify OTP
      const isValidOtp = await bcrypt.compare(otp, otpRecord.otp);
      if (!isValidOtp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      // Delete OTP record
      await otpRecord.destroy();

      logger.info('OTP verified successfully', { mobile });

      return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
      logger.error('Verify OTP error:', error);
      return res.status(500).json({
        message: 'Failed to verify OTP',
        error: error.message
      });
    }
  },

  clearOtp: async (req, res) => {
    try {
      const { mobile } = req.body;

      // Schedule OTP cleanup
      setTimeout(async () => {
        try {
          await Otp.destroy({ where: { mobile } });
          logger.info('OTP cleared for mobile:', mobile);
        } catch (error) {
          logger.error('Failed to clear OTP:', error);
        }
      }, Number(process.env.CLEAR_OTP || 300000)); // 5 minutes default

      return res.status(200).json({ message: 'OTP clear scheduled' });
    } catch (error) {
      logger.error('Clear OTP error:', error);
      return res.status(500).json({
        message: 'Failed to schedule OTP clear',
        error: error.message
      });
    }
  },

  // Password management
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = moment().add(1, 'hour').toDate();

      // Store reset token (you might want to add a resetToken field to User model)
      await user.update({
        resetToken,
        resetTokenExpiry
      });

      // Send reset email
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      const msg = {
        to: email,
        from: process.env.FROM_EMAIL,
        subject: 'Password Reset Request',
        html: `
          <h2>Password Reset Request</h2>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      };

      await sgMail.send(msg);

      logger.info('Password reset email sent', { email });

      return res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      logger.error('Forgot password error:', error);
      return res.status(500).json({
        message: 'Failed to send password reset email',
        error: error.message
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      const user = await User.findOne({
        where: {
          resetToken: token,
          resetTokenExpiry: {
            [Op.gt]: new Date()
          }
        }
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, Number(process.env.SALT_ROUNDS || 10));

      // Update password and clear reset token
      await user.update({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      });

      logger.info('Password reset successfully', { userId: user.id });

      return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      logger.error('Reset password error:', error);
      return res.status(500).json({
        message: 'Failed to reset password',
        error: error.message
      });
    }
  },

  // User profile methods
  getPersonalInfo: async (req, res) => {
    try {
      const userId = req.uid; // From RBAC middleware

      const user = await User.findByPk(userId, {
        include: [
          { model: UserProfile, as: 'profile' },
          { model: UserSettings, as: 'settings' },
          { model: Country, as: 'country' },
          { model: State, as: 'state' },
          { model: City, as: 'city' },
          { model: Pincode, as: 'pincode' }
        ]
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      logger.error('Get personal info error:', error);
      return res.status(500).json({
        message: 'Failed to get personal info',
        error: error.message
      });
    }
  },

  updatePersonalInfo: async (req, res) => {
    try {
      const userId = req.uid; // From RBAC middleware

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update user basic info
      const { name, email, mobile, ...profileData } = req.body;
      await user.update({ name, email, mobile });

      // Update or create profile
      const [profile] = await UserProfile.upsert({
        userId,
        ...profileData
      });

      logger.info('Personal info updated', { userId });

      return res.status(200).json({
        message: 'Personal info updated successfully',
        data: { user, profile }
      });
    } catch (error) {
      logger.error('Update personal info error:', error);
      return res.status(500).json({
        message: 'Failed to update personal info',
        error: error.message
      });
    }
  },

  updateAddress: async (req, res) => {
    try {
      const userId = req.uid;

      const { countryId, stateId, cityId, pincodeId, address } = req.body;

      await User.update({
        countryId,
        stateId,
        cityId,
        pincodeId
      }, { where: { id: userId } });

      // Update profile address if provided
      if (address) {
        await UserProfile.upsert({
          userId,
          address
        });
      }

      logger.info('Address updated', { userId });

      return res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
      logger.error('Update address error:', error);
      return res.status(500).json({
        message: 'Failed to update address',
        error: error.message
      });
    }
  },

  // RBAC Management Methods
  assignRole: async (req, res) => {
    try {
      const { userId, roleName } = req.body;

      // Check if user can assign roles
      const canAssignRole = await rbacService.canAssignRoleToUser(req.uid, roleName);
      if (!canAssignRole) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to assign this role'
        });
      }

      // Find user and role
      const user = await User.findByPk(userId);
      const role = await Role.findOne({ where: { name: roleName } });

      if (!user || !role) {
        return res.status(404).json({
          success: false,
          message: 'User or role not found'
        });
      }

      // Check if user already has this role
      const existingRole = await UserRole.findOne({
        where: { userId, roleId: role.id, isActive: true }
      });

      if (existingRole) {
        return res.status(409).json({
          success: false,
          message: 'User already has this role'
        });
      }

      // Deactivate existing active roles
      await UserRole.update(
        { isActive: false },
        { where: { userId, isActive: true } }
      );

      // Assign new role
      await UserRole.create({
        userId,
        roleId: role.id,
        assignedBy: req.uid,
        isActive: true
      });

      logger.info('Role assigned successfully', {
        userId,
        roleName,
        assignedBy: req.uid
      });

      return res.status(200).json({
        success: true,
        message: 'Role assigned successfully'
      });

    } catch (error) {
      logger.error('Assign role error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to assign role',
        error: error.message
      });
    }
  },

  revokeRole: async (req, res) => {
    try {
      const { userId, roleName } = req.body;

      // Check if user can revoke roles
      const canRevokeRole = await rbacService.hasPermission(req.uid, 'roles.revoke');
      if (!canRevokeRole) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to revoke roles'
        });
      }

      // Find role
      const role = await Role.findOne({ where: { name: roleName } });
      if (!role) {
        return res.status(404).json({
          success: false,
          message: 'Role not found'
        });
      }

      // Find and deactivate the role assignment
      const userRole = await UserRole.findOne({
        where: { userId, roleId: role.id, isActive: true }
      });

      if (!userRole) {
        return res.status(404).json({
          success: false,
          message: 'User does not have this active role'
        });
      }

      await userRole.update({ isActive: false });

      logger.info('Role revoked successfully', {
        userId,
        roleName,
        revokedBy: req.uid
      });

      return res.status(200).json({
        success: true,
        message: 'Role revoked successfully'
      });

    } catch (error) {
      logger.error('Revoke role error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to revoke role',
        error: error.message
      });
    }
  },

  getUserPermissions: async (req, res) => {
    try {
      const userId = req.params.id || req.uid;

      // Check if user can view permissions
      const canViewPermissions = await rbacService.hasPermission(req.uid, 'permissions.view');
      if (!canViewPermissions && userId !== req.uid) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to view user permissions'
        });
      }

      const permissions = await rbacService.getUserPermissions(userId);

      return res.status(200).json({
        success: true,
        data: permissions
      });

    } catch (error) {
      logger.error('Get user permissions error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to get user permissions',
        error: error.message
      });
    }
  },

  checkPermission: async (req, res) => {
    try {
      const { permission } = req.query;

      if (!permission) {
        return res.status(400).json({
          success: false,
          message: 'Permission parameter is required'
        });
      }

      const hasPermission = await rbacService.hasPermission(req.uid, permission);

      return res.status(200).json({
        success: true,
        data: {
          permission,
          hasPermission
        }
      });

    } catch (error) {
      logger.error('Check permission error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to check permission',
        error: error.message
      });
    }
  },
  getAgents: async (req, res) => {
    try {
      // Check if user can view agents
      const canReadAgents = await rbacService.checkResourceAccess(req, 'agents', 'read');
      if (!canReadAgents) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to view agents'
        });
      }

      const { pincodeId, cityId, page = 1, limit = 10, search } = req.query;

      // Build query with RBAC constraints
      const rbacQuery = await rbacService.generateAccessQuery(req);
      const where = {
        ...rbacQuery,
        role: { [Op.in]: ['REAL_ESTATE_AGENT', 'AGENT'] }, // Updated to use new role names
        status: 'ACTIVE'
      };

      if (pincodeId) where.pincodeId = pincodeId;
      if (cityId) where.cityId = cityId;
      if (search) {
        where[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          { mobile: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const agents = await User.findAndCountAll({
        where,
        include: [
          { model: UserProfile, as: 'profile' },
          { model: City, as: 'city' },
          { model: Pincode, as: 'pincode' },
          { model: UserRole, as: 'roles', include: [{ model: Role, as: 'role' }] }
        ],
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
        order: [['createdAt', 'DESC']]
      });

      return res.status(200).json({
        success: true,
        data: agents.rows,
        pagination: {
          total: agents.count,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(agents.count / parseInt(limit))
        }
      });
    } catch (error) {
      logger.error('Get agents error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to get agents',
        error: error.message
      });
    }
  },

  getAgentByPincode: async (req, res) => {
    try {
      const canReadAgents = await rbacService.checkResourceAccess(req, 'agents', 'read');
      if (!canReadAgents) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to view agents'
        });
      }

      const { pincodeId } = req.query;

      if (!pincodeId) {
        return res.status(400).json({ message: 'Pincode ID is required' });
      }

      // Build query with RBAC constraints
      const rbacQuery = await rbacService.generateAccessQuery(req);
      const where = {
        ...rbacQuery,
        role: { [Op.in]: ['REAL_ESTATE_AGENT', 'AGENT'] },
        status: 'ACTIVE',
        pincodeId
      };

      const agents = await User.findAll({
        where,
        include: [
          { model: UserProfile, as: 'profile' },
          { model: City, as: 'city' },
          { model: Pincode, as: 'pincode' },
          { model: UserRole, as: 'roles', include: [{ model: Role, as: 'role' }] }
        ],
        order: [['createdAt', 'DESC']]
      });

      return res.status(200).json({
        success: true,
        data: agents
      });
    } catch (error) {
      logger.error('Get agent by pincode error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to get agents by pincode',
        error: error.message
      });
    }
  },

  getAgentByCity: async (req, res) => {
    try {
      const { cityId } = req.query;

      if (!cityId) {
        return res.status(400).json({ message: 'City ID is required' });
      }

      const agents = await User.findAll({
        where: {
          role: 'AGENT',
          status: 'ACTIVE',
          cityId
        },
        include: [
          { model: UserProfile, as: 'profile' },
          { model: City, as: 'city' },
          { model: Pincode, as: 'pincode' }
        ],
        order: [['createdAt', 'DESC']]
      });

      return res.status(200).json({
        success: true,
        data: agents
      });
    } catch (error) {
      logger.error('Get agent by city error:', error);
      return res.status(500).json({
        message: 'Failed to get agents by city',
        error: error.message
      });
    }
  },

  filterAgentsByKey: async (req, res) => {
    try {
      const { searchKey, cityId, pincodeId } = req.body;

      const where = { role: 'AGENT', status: 'ACTIVE' };

      if (cityId) where.cityId = cityId;
      if (pincodeId) where.pincodeId = pincodeId;

      if (searchKey) {
        where[Op.or] = [
          { name: { [Op.iLike]: `%${searchKey}%` } },
          { email: { [Op.iLike]: `%${searchKey}%` } },
          { mobile: { [Op.iLike]: `%${searchKey}%` } }
        ];
      }

      const agents = await User.findAll({
        where,
        include: [
          { model: UserProfile, as: 'profile' },
          { model: City, as: 'city' },
          { model: Pincode, as: 'pincode' }
        ],
        order: [['name', 'ASC']]
      });

      return res.status(200).json({
        success: true,
        data: agents
      });
    } catch (error) {
      logger.error('Filter agents error:', error);
      return res.status(500).json({
        message: 'Failed to filter agents',
        error: error.message
      });
    }
  },

  // Listing interaction methods
  likeListing: async (req, res) => {
    try {
      const userId = req.uid;
      const { listingId } = req.body;

      // Check if already liked
      const existingLike = await ListingSave.findOne({
        where: { userId, listingId }
      });

      if (existingLike) {
        return res.status(400).json({ message: 'Listing already liked' });
      }

      // Create like
      await ListingSave.create({ userId, listingId });

      logger.info('Listing liked', { userId, listingId });

      return res.status(200).json({ message: 'Listing liked successfully' });
    } catch (error) {
      logger.error('Like listing error:', error);
      return res.status(500).json({
        message: 'Failed to like listing',
        error: error.message
      });
    }
  },

  dislikeListing: async (req, res) => {
    try {
      const userId = req.uid;
      const { listingId } = req.body;

      const deleted = await ListingSave.destroy({
        where: { userId, listingId }
      });

      if (!deleted) {
        return res.status(404).json({ message: 'Like not found' });
      }

      logger.info('Listing disliked', { userId, listingId });

      return res.status(200).json({ message: 'Listing disliked successfully' });
    } catch (error) {
      logger.error('Dislike listing error:', error);
      return res.status(500).json({
        message: 'Failed to dislike listing',
        error: error.message
      });
    }
  },

  getLikedListings: async (req, res) => {
    try {
      const userId = req.uid;

      const likedListings = await ListingSave.findAll({
        where: { userId },
        include: [
          {
            model: db.Listing,
            as: 'listing',
            include: [
              { model: User, as: 'user' },
              { model: City, as: 'city' }
            ]
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      return res.status(200).json({
        success: true,
        data: likedListings
      });
    } catch (error) {
      logger.error('Get liked listings error:', error);
      return res.status(500).json({
        message: 'Failed to get liked listings',
        error: error.message
      });
    }
  },

  visitListing: async (req, res) => {
    try {
      const userId = req.uid;
      const { listingId } = req.body;

      // Record visit
      await ListingVisit.create({
        userId,
        listingId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      logger.info('Listing visited', { userId, listingId });

      return res.status(200).json({ message: 'Visit recorded successfully' });
    } catch (error) {
      logger.error('Visit listing error:', error);
      return res.status(500).json({
        message: 'Failed to record visit',
        error: error.message
      });
    }
  },

  subscribeToListing: async (req, res) => {
    try {
      const userId = req.uid;
      const { listingId } = req.body;

      // Check if already subscribed
      const existingSubscription = await ListingSubscriber.findOne({
        where: { userId, listingId }
      });

      if (existingSubscription) {
        return res.status(400).json({ message: 'Already subscribed to this listing' });
      }

      // Create subscription
      await ListingSubscriber.create({ userId, listingId });

      logger.info('Listing subscribed', { userId, listingId });

      return res.status(200).json({ message: 'Subscribed to listing successfully' });
    } catch (error) {
      logger.error('Subscribe to listing error:', error);
      return res.status(500).json({
        message: 'Failed to subscribe to listing',
        error: error.message
      });
    }
  },

  reportListing: async (req, res) => {
    try {
      const userId = req.uid;
      const { listingId, reason, description } = req.body;

      // Create report
      await ReportListing.create({
        listingId,
        reportedBy: userId,
        reason,
        description,
        ipAddress: req.ip
      });

      logger.info('Listing reported', { userId, listingId, reason });

      return res.status(200).json({ message: 'Listing reported successfully' });
    } catch (error) {
      logger.error('Report listing error:', error);
      return res.status(500).json({
        message: 'Failed to report listing',
        error: error.message
      });
    }
  },

  // Statistics methods
  getStats: async (req, res) => {
    try {
      const [
        totalUsers,
        totalAgents,
        activeUsers,
        pendingAgents
      ] = await Promise.all([
        User.count(),
        User.count({ where: { role: 'AGENT' } }),
        User.count({ where: { status: 'ACTIVE' } }),
        User.count({ where: { role: 'AGENT', status: 'PENDING_APPROVAL' } })
      ]);

      return res.status(200).json({
        success: true,
        data: {
          totalUsers,
          totalAgents,
          activeUsers,
          pendingAgents
        }
      });
    } catch (error) {
      logger.error('Get stats error:', error);
      return res.status(500).json({
        message: 'Failed to get stats',
        error: error.message
      });
    }
  },

  getUserCount: async (req, res) => {
    try {
      const count = await User.count({
        where: { status: 'ACTIVE' }
      });

      return res.status(200).json({
        success: true,
        count
      });
    } catch (error) {
      logger.error('Get user count error:', error);
      return res.status(500).json({
        message: 'Failed to get user count',
        error: error.message
      });
    }
  },

  getAgentPageCount: async (req, res) => {
    try {
      const count = await User.count({
        where: {
          role: 'AGENT',
          status: 'ACTIVE'
        }
      });

      return res.status(200).json({
        success: true,
        count
      });
    } catch (error) {
      logger.error('Get agent page count error:', error);
      return res.status(500).json({
        message: 'Failed to get agent count',
        error: error.message
      });
    }
  },

  // Status management
  updateStatus: async (req, res) => {
    try {
      const { userId, status } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.update({ status });

      logger.info('User status updated', { userId, status, updatedBy: req.uid });

      return res.status(200).json({
        message: 'User status updated successfully',
        data: { userId, status }
      });
    } catch (error) {
      logger.error('Update status error:', error);
      return res.status(500).json({
        message: 'Failed to update user status',
        error: error.message
      });
    }
  },

  // Legacy methods for backward compatibility
  registerUser: async (req, res) => {
    return this.register(req, res);
  },

  registerAgent: async (req, res) => {
    return this.agentRegister(req, res);
  },

  webRegister: async (req, res) => {
    return this.register(req, res);
  },

  webLogin: async (req, res) => {
    return this.login(req, res);
  },

  update: async (req, res) => {
    return commonCrudService.updateRecord(User, req, res, 'users');
  },

  remove: async (req, res) => {
    return commonCrudService.deleteRecord(User, req, res, 'users');
  },

  single: async (req, res) => {
    return commonCrudService.findOneRecord(User, req, res, 'users', {
      includes: [
        { model: UserProfile, as: 'profile' },
        { model: UserSettings, as: 'settings' },
        { model: UserRole, as: 'roles', include: [{ model: Role, as: 'role' }] },
        { model: Country, as: 'country' },
        { model: State, as: 'state' },
        { model: City, as: 'city' },
        { model: Pincode, as: 'pincode' }
      ]
    });
  },

  personalInfo: async (req, res) => {
    return this.getPersonalInfo(req, res);
  },

  getAgent: async (req, res) => {
    return this.getAgents(req, res);
  },

  ssr: async (req, res) => {
    return commonCrudService.listRecordsSSR(User, req, res, 'users', {
      searchFields: ['name', 'email', 'mobile'],
      includes: [
        { model: UserProfile, as: 'profile' },
        { model: UserRole, as: 'roles', include: [{ model: Role, as: 'role' }] },
        { model: Country, as: 'country' },
        { model: State, as: 'state' },
        { model: City, as: 'city' },
        { model: Pincode, as: 'pincode' }
      ]
    });
  },

  status: async (req, res) => {
    return this.updateStatus(req, res);
  },

  updateUser: async (req, res) => {
    return commonCrudService.updateRecord(User, req, res, 'users');
  },

  getUser: async (req, res) => {
    return commonCrudService.listRecords(User, req, res, 'users', {
      additionalWhere: {},
      includes: [
        { model: UserProfile, as: 'profile' },
        { model: UserRole, as: 'roles', include: [{ model: Role, as: 'role' }] },
        { model: Country, as: 'country' },
        { model: State, as: 'state' },
        { model: City, as: 'city' },
        { model: Pincode, as: 'pincode' }
      ]
    });
  },

  getSingleUser: async (req, res) => {
    return commonCrudService.findOneRecord(User, req, res, 'users', {
      includes: [
        { model: UserProfile, as: 'profile' },
        { model: UserSettings, as: 'settings' },
        { model: UserRole, as: 'roles', include: [{ model: Role, as: 'role' }] },
        { model: Country, as: 'country' },
        { model: State, as: 'state' },
        { model: City, as: 'city' },
        { model: Pincode, as: 'pincode' }
      ]
    });
  },

  agentByPincode: async (req, res) => {
    return this.getAgentByPincode(req, res);
  },

  agentByCity: async (req, res) => {
    return this.getAgentByCity(req, res);
  },

  stats: async (req, res) => {
    return this.getStats(req, res);
  },

  userCount: async (req, res) => {
    return this.getUserCount(req, res);
  },

  agentPageCount: async (req, res) => {
    return this.getAgentPageCount(req, res);
  },

  filterAgentByKey: async (req, res) => {
    return this.filterAgentsByKey(req, res);
  },

  updatePersonalInfo: async (req, res) => {
    return this.updatePersonalInfo(req, res);
  },

  listingSubscribers: async (req, res) => {
    // This would need additional implementation for counting subscribers
    return res.status(200).json({ message: 'Feature not implemented yet' });
  },

  subscribersToListing: async (req, res) => {
    return this.subscribeToListing(req, res);
  },

  weatherLiked: async (req, res) => {
    return this.likeListing(req, res);
  },

  likeCount: async (req, res) => {
    // This would need additional implementation for counting likes
    return res.status(200).json({ message: 'Feature not implemented yet' });
  },

  weatherVisited: async (req, res) => {
    return this.visitListing(req, res);
  }
};

export default userController;