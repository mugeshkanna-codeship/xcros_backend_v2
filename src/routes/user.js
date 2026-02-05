import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import {
  authenticateToken,
  checkRBAC,
  authMiddleware,
  requirePermission,
  requireResourceAccess
} from '../middleware/auth.middleware.js';
import rbacService from '../services/rbacService.js';

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization endpoints
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints with RBAC
 */

/**
 * @swagger
 * tags:
 *   name: Agents
 *   description: Real estate agent specific endpoints
 */

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role and permission management
 */

// Public routes (no authentication required)
router.post('/register', userController.register);
router.post('/agent-register', userController.agentRegister);
router.post('/login', userController.login);
router.post('/admin-login', userController.adminLogin);
router.post('/frontend-register', userController.webRegister);
router.post('/frontend-login', userController.webLogin);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Authentication]
 *     summary: User login
 *     description: Authenticate user and return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       description: JWT authentication token
 *                     permissions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: User's permissions
 *                     dataScope:
 *                       type: string
 *                       enum: [GLOBAL, COMPANY, BRANCH, DEPARTMENT, SELF]
 *                       description: User's data access scope
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     description: Create a new user account with basic information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               mobile:
 *                 type: string
 *                 description: User's mobile number
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (min 6 characters)
 *               role:
 *                 type: string
 *                 enum: [REAL_ESTATE_AGENT, PROPERTY_OWNER]
 *                 description: User role (optional)
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       description: JWT authentication token
 *       400:
 *         description: Validation error
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

// OTP routes
router.post('/send-otp', userController.sendOtp);
router.post('/verify-otp', userController.verifyOtp);
router.post('/clear-otp', userController.clearOtp);

/**
 * @swagger
 * /api/users/send-otp:
 *   post:
 *     tags: [Authentication]
 *     summary: Send OTP to mobile/email
 *     description: Send OTP for verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - type
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Email or mobile number
 *               type:
 *                 type: string
 *                 enum: [email, mobile]
 *                 description: OTP delivery method
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/verify-otp:
 *   post:
 *     tags: [Authentication]
 *     summary: Verify OTP
 *     description: Verify OTP code sent to user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - otp
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Email or mobile number
 *               otp:
 *                 type: string
 *                 description: OTP code
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 *       500:
 *         description: Internal server error
 */

// Password management
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Request password reset
 *     description: Send password reset link to user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Reset password
 *     description: Reset user password using reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: Password reset token
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid token or password
 *       500:
 *         description: Internal server error
 */

// Protected routes (authentication required)
router.use(authMiddleware);

// Profile routes
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Get user profile
 *     description: Get current authenticated user's profile information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     profile:
 *                       $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     tags: [Users]
 *     summary: Update user profile
 *     description: Update current authenticated user's profile information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               bio:
 *                 type: string
 *                 description: User biography
 *               avatar:
 *                 type: string
 *                 description: Avatar image URL
 *               address:
 *                 type: string
 *                 description: User address
 *               city:
 *                 type: string
 *                 description: City name
 *               state:
 *                 type: string
 *                 description: State name
 *               country:
 *                 type: string
 *                 description: Country name
 *               pincode:
 *                 type: string
 *                 description: Postal code
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       500:
 *         description: Internal server error
 */

// User CRUD operations with enhanced RBAC
router.post('/', requireResourceAccess('users', 'create'), userController.createUser);
router.get('/', requireResourceAccess('users', 'read'), userController.listUsers);
router.post('/ssr', requireResourceAccess('users', 'read'), userController.listUsersSSR);
router.get('/:id', requireResourceAccess('users', 'read'), userController.getUser);
router.put('/:id', requireResourceAccess('users', 'update'), userController.updateUser);
router.delete('/:id', requireResourceAccess('users', 'delete'), userController.deleteUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: Create new user
 *     description: Create a new user account (requires users.create permission)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: List users
 *     description: Get paginated list of users (requires users.read permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     description: Get specific user details (requires users.read permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update user
 *     description: Update user information (requires users.update permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user
 *     description: Delete user account (requires users.delete permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

// RBAC Management routes
router.post('/assign-role', requirePermission('roles.assign'), userController.assignRole);
router.post('/revoke-role', requirePermission('roles.revoke'), userController.revokeRole);
router.get('/permissions', requirePermission('permissions.view'), userController.getUserPermissions);
router.get('/permissions/:id', requirePermission('permissions.view'), userController.getUserPermissions);
router.get('/check-permission', userController.checkPermission);

/**
 * @swagger
 * /api/users/assign-role:
 *   post:
 *     tags: [Roles]
 *     summary: Assign role to user
 *     description: Assign a role to a user (requires roles.assign permission)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleId
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: User ID
 *               roleId:
 *                 type: string
 *                 format: uuid
 *                 description: Role ID
 *               isActive:
 *                 type: boolean
 *                 default: true
 *                 description: Whether this is the active role
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/revoke-role:
 *   post:
 *     tags: [Roles]
 *     summary: Revoke role from user
 *     description: Revoke a role from a user (requires roles.revoke permission)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleId
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: User ID
 *               roleId:
 *                 type: string
 *                 format: uuid
 *                 description: Role ID
 *     responses:
 *       200:
 *         description: Role revoked successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/permissions:
 *   get:
 *     tags: [Roles]
 *     summary: Get user permissions
 *     description: Get permissions for current user or specified user (requires permissions.view permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID (optional, defaults to current user)
 *     responses:
 *       200:
 *         description: Permissions retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       500:
 *         description: Internal server error
 */

// Legacy routes for backward compatibility
router.post('/user', requireResourceAccess('users', 'create'), userController.registerUser);
router.post('/agent', requireResourceAccess('users', 'create'), userController.registerAgent);
router.put('/', requireResourceAccess('users', 'update'), userController.update);
router.delete('/', requireResourceAccess('users', 'delete'), userController.remove);
router.get('/single', requireResourceAccess('users', 'read'), userController.single);

// Personal info routes
router.get('/get-personalinfo', userController.getPersonalInfo);
router.put('/add-personalinfo', userController.updatePersonalInfo);
router.put('/address', userController.updateAddress);

// Agent routes with RBAC
router.get('/agent', requireResourceAccess('agents', 'read'), userController.getAgent);
router.get('/get-agent', requireResourceAccess('agents', 'read'), userController.getAgent);
router.get('/get-agent-pincode', requireResourceAccess('agents', 'read'), userController.getAgentByPincode);
router.get('/get-agent-city', requireResourceAccess('agents', 'read'), userController.getAgentByCity);
router.get('/get-agent-count', requireResourceAccess('agents', 'read'), userController.getAgentPageCount);
router.post('/agent/filter-by-key', requireResourceAccess('agents', 'read'), userController.filterAgentByKey);

/**
 * @swagger
 * /api/users/agent:
 *   get:
 *     tags: [Agents]
 *     summary: Get agents
 *     description: Get list of real estate agents (requires agents.read permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: pincode
 *         schema:
 *           type: string
 *         description: Filter by pincode
 *     responses:
 *       200:
 *         description: Agents retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/get-agent-pincode:
 *   get:
 *     tags: [Agents]
 *     summary: Get agents by pincode
 *     description: Get agents filtered by pincode (requires agents.read permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pincode
 *         required: true
 *         schema:
 *           type: string
 *         description: Pincode to filter agents
 *     responses:
 *       200:
 *         description: Agents retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       500:
 *         description: Internal server error
 */

// User management (admin routes)
router.put('/status', requireResourceAccess('users', 'update'), userController.status);
router.put('/user', requireResourceAccess('users', 'update'), userController.updateUser);
router.get('/get-user', requireResourceAccess('users', 'read'), userController.getUser);
router.delete('/remove-agent-admin', requireResourceAccess('users', 'delete'), userController.remove);
router.get('/get-single-user', requireResourceAccess('users', 'read'), userController.getSingleUser);

// Statistics routes
router.get('/get-stats', requireResourceAccess('users', 'read'), userController.stats);
router.get('/user-counter', requireResourceAccess('users', 'read'), userController.userCount);

// Listing interaction routes
router.post('/Listing-subscribe', userController.subscribersToListing);
router.get('/count-Listing-subscribe', userController.listingSubscribers);
router.post('/like-Listing', userController.likeListing);
router.post('/weather-liked', userController.weatherLiked);
router.post('/dislike-Listing', userController.dislikeListing);
router.get('/like-count', userController.likeCount);
router.get('/liked-listings', userController.getLikedListings);
router.post('/report-Listing', userController.reportListing);
router.post('/visit-Listing', userController.visitListing);
router.post('/weather-visited', userController.weatherVisited);

// SSR route for backward compatibility
router.get('/ssr', requireResourceAccess('users', 'read'), userController.ssr);

export default router;