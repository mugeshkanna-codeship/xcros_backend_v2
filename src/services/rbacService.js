/**
 * Enhanced Production-Grade RBAC Service for Xcros Real Estate Platform
 * Multi-layer permission system with role-based access control
 */

import db from '../models/index.js';
import { Op } from 'sequelize';
import {
  PERMISSION_TEMPLATES,
  matchesWildcard,
  mergePermissions,
  hasPermissionLevel,
  getRoleHierarchy,
  canAssignRole,
  ROLES,
  DATA_SCOPES
} from '../../config/permissions.js';

// Define core roles for real estate platform
// ROLES imported from config/permissions.js

/**
 * Check if user is SUPERADMIN (can access everything)
 */
export const isSuperAdmin = (role) => {
  return role === ROLES.SUPERADMIN;
};

/**
 * Check if user is agent (needs uid-based filtering for own listings)
 */
export const isAgent = (role) => {
  return role === ROLES.REAL_ESTATE_AGENT;
};

/**
 * Check if user is property owner (limited access)
 */
export const isPropertyOwner = (role) => {
  return role === ROLES.PROPERTY_OWNER;
};

/**
 * Get base permissions from role
 */
const getRoleBasePermissions = (role) => {
  switch (role) {
    case ROLES.SUPERADMIN:
      return ["*"];
    case ROLES.COMPANY_ADMIN:
      return [
        "users.*",
        "listings.*",
        "agents.*",
        "reports.*",
        "analytics.*",
        "settings.company.*",
        "packages.*",
        "coupons.*",
        "banners.*",
        "blogs.*",
        "faqs.*",
        "support.*",
        "notifications.*"
      ];
    case ROLES.REAL_ESTATE_AGENT:
      return [
        "users.read",
        "users.update",
        "listings.create",
        "listings.read",
        "listings.update",
        "listings.delete",
        "agents.read",
        "agents.update",
        "reports.create",
        "reports.read",
        "packages.read",
        "coupons.read",
        "notifications.read",
        "support.create",
        "support.read"
      ];
    case ROLES.PROPERTY_OWNER:
      return [
        "users.read",
        "users.update",
        "listings.create",
        "listings.read",
        "listings.update",
        "packages.read",
        "coupons.read",
        "notifications.read",
        "support.create",
        "support.read"
      ];
    case ROLES.CONTENT_MANAGER:
      return [
        "blogs.*",
        "banners.*",
        "faqs.*",
        "testimonials.*",
        "media.*",
        "categories.read",
        "tags.*",
        "reports.read",
        "analytics.read"
      ];
    case ROLES.SUPPORT_STAFF:
      return [
        "users.read",
        "support.*",
        "reports.read",
        "notifications.send",
        "faqs.read",
        "analytics.support.*"
      ];
    case ROLES.MARKETING_MANAGER:
      return [
        "coupons.*",
        "banners.*",
        "promotions.*",
        "analytics.marketing.*",
        "reports.marketing.*",
        "subscribers.*",
        "notifications.send"
      ];
    case ROLES.FINANCE_MANAGER:
      return [
        "payments.*",
        "bookings.read",
        "packages.*",
        "coupons.read",
        "reports.financial.*",
        "analytics.financial.*"
      ];
    default:
      return [];
  }
};

/**
 * Get complete permissions for a user (with caching support)
 * @param {string} userId - User ID
 * @param {boolean} useCache - Whether to use cached permissions (default: true)
 * @returns {Object} - User permissions object
 */
export const getUserPermissions = async (userId, useCache = true) => {
  try {
    const user = await db.User.findByPk(userId, {
      include: [
        {
          model: db.UserRole,
          as: "roles",
          include: [{
            model: db.Role,
            as: "role"
          }]
        },
        {
          model: db.UserProfile,
          as: "profile"
        }
      ],
    });

    if (!user) return null;

    // Get primary role (first active role)
    const activeRole = user.roles?.find(r => r.isActive)?.role;
    if (!activeRole) return null;

    // 1. Base permissions from role
    let permissions = getRoleBasePermissions(activeRole.name);

    // 2. Add role-specific permissions from database
    if (activeRole.permissions && Array.isArray(activeRole.permissions)) {
      permissions = mergePermissions(permissions, activeRole.permissions);
    }

    // 3. Add user-specific permissions (if any custom permissions exist)
    // Note: This would require additional user permission tables in production

    return {
      permissions,
      role: activeRole.name,
      roleId: activeRole.id,
      userId: user.id,
      dataScope: getDataScopeForRole(activeRole.name),
      departmentAccess: [], // Could be extended for department-based access
      modules: getAllowedModules(activeRole.name),
      menu: getMenuPermissions(activeRole.name)
    };
  } catch (error) {
    console.error("Error getting user permissions:", error);
    return null;
  }
};

/**
 * Get data scope for a role
 */
const getDataScopeForRole = (role) => {
  const scopeMap = {
    [ROLES.SUPERADMIN]: DATA_SCOPES.GLOBAL,
    [ROLES.COMPANY_ADMIN]: DATA_SCOPES.COMPANY,
    [ROLES.REAL_ESTATE_AGENT]: DATA_SCOPES.SELF,
    [ROLES.PROPERTY_OWNER]: DATA_SCOPES.SELF,
    [ROLES.CONTENT_MANAGER]: DATA_SCOPES.COMPANY,
    [ROLES.SUPPORT_STAFF]: DATA_SCOPES.COMPANY,
    [ROLES.MARKETING_MANAGER]: DATA_SCOPES.COMPANY,
    [ROLES.FINANCE_MANAGER]: DATA_SCOPES.COMPANY
  };

  return scopeMap[role] || DATA_SCOPES.SELF;
};

/**
 * Get allowed modules for a role
 */
const getAllowedModules = (role) => {
  const moduleMap = {
    [ROLES.SUPERADMIN]: ["*"],
    [ROLES.COMPANY_ADMIN]: ["users", "listings", "agents", "reports", "analytics", "settings", "packages", "coupons", "content", "support"],
    [ROLES.REAL_ESTATE_AGENT]: ["listings", "agents", "reports", "packages", "coupons", "support"],
    [ROLES.PROPERTY_OWNER]: ["listings", "packages", "coupons", "support"],
    [ROLES.CONTENT_MANAGER]: ["content", "blogs", "banners", "faqs", "reports"],
    [ROLES.SUPPORT_STAFF]: ["support", "users", "reports"],
    [ROLES.MARKETING_MANAGER]: ["marketing", "coupons", "banners", "reports", "analytics"],
    [ROLES.FINANCE_MANAGER]: ["finance", "payments", "packages", "reports", "analytics"]
  };

  return moduleMap[role] || [];
};

/**
 * Get menu permissions for a role
 */
const getMenuPermissions = (role) => {
  // Define menu structure based on role
  const baseMenu = {
    dashboard: true,
    profile: true
  };

  const roleMenus = {
    [ROLES.SUPERADMIN]: {
      ...baseMenu,
      users: true,
      listings: true,
      agents: true,
      reports: true,
      analytics: true,
      settings: true,
      packages: true,
      coupons: true,
      content: true,
      support: true
    },
    [ROLES.COMPANY_ADMIN]: {
      ...baseMenu,
      users: true,
      listings: true,
      agents: true,
      reports: true,
      analytics: true,
      settings: true,
      packages: true,
      coupons: true,
      content: true,
      support: true
    },
    [ROLES.REAL_ESTATE_AGENT]: {
      ...baseMenu,
      listings: true,
      agents: true,
      reports: true,
      packages: true,
      coupons: true,
      support: true
    },
    [ROLES.PROPERTY_OWNER]: {
      ...baseMenu,
      listings: true,
      packages: true,
      coupons: true,
      support: true
    },
    [ROLES.CONTENT_MANAGER]: {
      ...baseMenu,
      content: true,
      blogs: true,
      banners: true,
      faqs: true,
      reports: true
    },
    [ROLES.SUPPORT_STAFF]: {
      ...baseMenu,
      support: true,
      users: true,
      reports: true
    },
    [ROLES.MARKETING_MANAGER]: {
      ...baseMenu,
      marketing: true,
      coupons: true,
      banners: true,
      reports: true,
      analytics: true
    },
    [ROLES.FINANCE_MANAGER]: {
      ...baseMenu,
      finance: true,
      payments: true,
      packages: true,
      reports: true,
      analytics: true
    }
  };

  return roleMenus[role] || baseMenu;
};

/**
 * Check if user has specific permission
 * @param {string} userId - User ID
 * @param {string} permission - Permission to check (e.g., 'listings.create')
 * @returns {boolean} - True if user has permission
 */
export const hasPermission = async (userId, permission) => {
  try {
    const userPerms = await getUserPermissions(userId);
    if (!userPerms) return false;

    // SUPERADMIN has all permissions
    if (userPerms.permissions.includes("*")) return true;

    // Check for exact permission
    if (userPerms.permissions.includes(permission)) return true;

    // Check for wildcard permissions
    for (const perm of userPerms.permissions) {
      if (matchesWildcard(permission, perm)) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error checking permission:", error);
    return false;
  }
};

/**
 * Check if user has any of the specified permissions
 * @param {string} userId - User ID
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean} - True if user has at least one permission
 */
export const hasAnyPermission = async (userId, permissions) => {
  for (const permission of permissions) {
    if (await hasPermission(userId, permission)) {
      return true;
    }
  }
  return false;
};

/**
 * Check if user has all of the specified permissions
 * @param {string} userId - User ID
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean} - True if user has all permissions
 */
export const hasAllPermissions = async (userId, permissions) => {
  for (const permission of permissions) {
    if (!(await hasPermission(userId, permission))) {
      return false;
    }
  }
  return true;
};

/**
 * Enhanced access query with role-based filtering for real estate platform
 * @param {Object} req - Express request object
 * @param {Object} additionalWhere - Additional where conditions
 * @returns {Object} - Sequelize where clause
 */
export const generateAccessQuery = async (req, additionalWhere = {}) => {
  if (!req.uid) return { id: null }; // Deny all

  const userPerms = await getUserPermissions(req.uid);
  if (!userPerms) return { id: null }; // Deny all

  const query = { ...additionalWhere };

  // Apply data scope filtering based on real estate business logic
  switch (userPerms.dataScope) {
    case DATA_SCOPES.GLOBAL:
      // No filtering - SUPERADMIN can see everything
      break;

    case DATA_SCOPES.COMPANY:
      // Company admins can see data for their company
      if (req.company) {
        query.company = req.company;
      }
      break;

    case DATA_SCOPES.SELF:
      // Agents and property owners can only see their own data
      if (isAgent(userPerms.role) || isPropertyOwner(userPerms.role)) {
        query.uid = req.uid;
      }
      break;

    default:
      // Default to self-access for safety
      query.uid = req.uid;
      break;
  }

  return query;
};

/**
 * Apply role-based data to request body for creation in real estate context
 */
export const applyDataToBody = async (req, body = null) => {
  const originalBody = body || req.body;
  const targetBody = { ...originalBody };

  // Always set uid for tracking who created the record
  if (req.uid) targetBody.uid = req.uid;

  // Set company for company-scoped data
  if (req.company) targetBody.company = req.company;

  // For listings, ensure agent/owner relationship
  if (targetBody.listing_type === 'agent_listing' && req.uid) {
    targetBody.agent_id = req.uid;
  }

  return targetBody;
};

/**
 * Get creator and tenant data for spreading into Sequelize create calls
 */
export const getCreatorAndTenantData = (req) => {
  const data = {};
  if (req.uid) data.uid = req.uid;
  if (req.company) data.company = req.company;
  return data;
};

/**
 * Check resource access and log the attempt
 * @param {Object} req - Express request object
 * @param {string} resource - Resource name (e.g., 'listings', 'users')
 * @param {string} action - Action (e.g., 'create', 'read', 'update', 'delete')
 * @returns {boolean} - True if access is granted
 */
export const checkResourceAccess = async (req, resource, action = null) => {
  const permission = action ? `${resource}.${action}` : resource;
  const hasAccess = await hasPermission(req.uid, permission);

  // Log access attempts for security auditing
  if (!hasAccess) {
    console.warn(`Access denied: User ${req.uid} attempted ${permission}`, {
      user: req.uid,
      role: req.role,
      company: req.company,
      resource,
      action,
      ip: req.ip,
      userAgent: req.get("user-agent")
    });
  }

  return hasAccess;
};

/**
 * Validate if user can perform action on specific resource
 * @param {string} userId - User ID
 * @param {string} resource - Resource name
 * @param {string} action - Action to perform
 * @param {Object} resourceData - Resource data for ownership validation
 * @returns {boolean} - True if action is allowed
 */
export const canPerformAction = async (userId, resource, action, resourceData = {}) => {
  const userPerms = await getUserPermissions(userId);
  if (!userPerms) return false;

  // SUPERADMIN can do anything
  if (isSuperAdmin(userPerms.role)) return true;

  const permission = `${resource}.${action}`;

  // Check basic permission
  if (!hasPermissionLevel(userPerms.permissions, permission)) {
    return false;
  }

  // Additional ownership checks for real estate specific resources
  if (userPerms.dataScope === DATA_SCOPES.SELF) {
    switch (resource) {
      case 'listings':
        // Agents and owners can only modify their own listings
        return resourceData.uid === userId || resourceData.agent_id === userId;

      case 'agents':
        // Agents can only modify their own profile
        return resourceData.user_id === userId;

      case 'users':
        // Users can only modify their own profile
        return resourceData.id === userId;

      default:
        return true;
    }
  }

  return true;
};

/**
 * Get user role information
 * @param {string} userId - User ID
 * @returns {Object} - Role information
 */
export const getUserRole = async (userId) => {
  try {
    const userPerms = await getUserPermissions(userId);
    return userPerms ? {
      role: userPerms.role,
      roleId: userPerms.roleId,
      permissions: userPerms.permissions,
      dataScope: userPerms.dataScope
    } : null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};

/**
 * Check if user can assign roles
 * @param {string} assignerId - User doing the assignment
 * @param {string} targetRole - Role being assigned
 * @returns {boolean} - True if assignment is allowed
 */
export const canAssignRoleToUser = async (assignerId, targetRole) => {
  const assignerPerms = await getUserPermissions(assignerId);
  if (!assignerPerms) return false;

  // SUPERADMIN can assign any role
  if (isSuperAdmin(assignerPerms.role)) return true;

  // Company admins can assign roles within their company
  if (assignerPerms.role === ROLES.COMPANY_ADMIN) {
    return canAssignRole(assignerPerms.role, targetRole);
  }

  return false;
};

/**
 * Standard error responses for RBAC
 */
export const RBAC_ERRORS = {
  ACCESS_DENIED: {
    statusCode: 403,
    message: "Access denied",
  },
  RESOURCE_NOT_FOUND: {
    statusCode: 404,
    message: "Resource not found",
  },
  PERMISSION_REQUIRED: {
    statusCode: 403,
    message: "Insufficient permissions",
  },
  OWNERSHIP_REQUIRED: {
    statusCode: 403,
    message: "You can only modify your own resources",
  }
};

// Export default object for easy importing
export default {
  ROLES,
  isSuperAdmin,
  isAgent,
  isPropertyOwner,
  getUserPermissions,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  generateAccessQuery,
  applyDataToBody,
  getCreatorAndTenantData,
  checkResourceAccess,
  canPerformAction,
  getUserRole,
  canAssignRoleToUser,
  RBAC_ERRORS,
};