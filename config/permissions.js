/**
 * Permission Templates and Configuration for Xcros Real Estate Platform
 * Production-grade RBAC permission system
 */

import { Op } from 'sequelize';

// Permission templates for different user types in real estate platform
export const PERMISSION_TEMPLATES = {
  // Super Admin - Full access
  SUPER_ADMIN: {
    name: 'Super Admin',
    permissions: ['*'],
    dataScope: 'GLOBAL',
    description: 'Full system access'
  },

  // Company Admin - Company-wide access
  COMPANY_ADMIN: {
    name: 'Company Admin',
    permissions: [
      'users.*',
      'listings.*',
      'agents.*',
      'reports.*',
      'analytics.*',
      'settings.company.*',
      'packages.*',
      'coupons.*',
      'banners.*',
      'blogs.*',
      'faqs.*',
      'support.*',
      'notifications.*'
    ],
    dataScope: 'COMPANY',
    description: 'Company-wide administrative access'
  },

  // Real Estate Agent - Agent-specific operations
  REAL_ESTATE_AGENT: {
    name: 'Real Estate Agent',
    permissions: [
      'users.read',
      'users.update', // Can update own profile
      'listings.create',
      'listings.read',
      'listings.update', // Can update own listings
      'listings.delete', // Can delete own listings
      'agents.read',
      'agents.update', // Can update own agent profile
      'reports.create', // Can create reports
      'reports.read', // Can read own reports
      'packages.read',
      'coupons.read',
      'notifications.read',
      'support.create', // Can create support tickets
      'support.read' // Can read own tickets
    ],
    dataScope: 'SELF',
    description: 'Real estate agent permissions'
  },

  // Property Owner/Client - Limited access
  PROPERTY_OWNER: {
    name: 'Property Owner',
    permissions: [
      'users.read',
      'users.update', // Can update own profile
      'listings.create', // Can create listings
      'listings.read',
      'listings.update', // Can update own listings
      'packages.read',
      'coupons.read',
      'notifications.read',
      'support.create',
      'support.read'
    ],
    dataScope: 'SELF',
    description: 'Property owner/client permissions'
  },

  // Content Manager - Content-related operations
  CONTENT_MANAGER: {
    name: 'Content Manager',
    permissions: [
      'blogs.*',
      'banners.*',
      'faqs.*',
      'testimonials.*',
      'media.*',
      'categories.read',
      'tags.*',
      'reports.read',
      'analytics.read'
    ],
    dataScope: 'COMPANY',
    description: 'Content management permissions'
  },

  // Support Staff - Customer support
  SUPPORT_STAFF: {
    name: 'Support Staff',
    permissions: [
      'users.read',
      'support.*',
      'reports.read',
      'notifications.send',
      'faqs.read',
      'analytics.support.*'
    ],
    dataScope: 'COMPANY',
    description: 'Customer support permissions'
  },

  // Marketing Manager - Marketing operations
  MARKETING_MANAGER: {
    name: 'Marketing Manager',
    permissions: [
      'coupons.*',
      'banners.*',
      'promotions.*',
      'analytics.marketing.*',
      'reports.marketing.*',
      'subscribers.*',
      'notifications.send'
    ],
    dataScope: 'COMPANY',
    description: 'Marketing and promotional permissions'
  },

  // Finance Manager - Financial operations
  FINANCE_MANAGER: {
    name: 'Finance Manager',
    permissions: [
      'payments.*',
      'bookings.read',
      'packages.*',
      'coupons.read',
      'reports.financial.*',
      'analytics.financial.*'
    ],
    dataScope: 'COMPANY',
    description: 'Financial management permissions'
  }
};

// Core resource permissions for real estate platform
export const RESOURCE_PERMISSIONS = {
  // User Management
  users: {
    create: 'users.create',
    read: 'users.read',
    update: 'users.update',
    delete: 'users.delete',
    approve: 'users.approve',
    suspend: 'users.suspend'
  },

  // Listings Management
  listings: {
    create: 'listings.create',
    read: 'listings.read',
    update: 'listings.update',
    delete: 'listings.delete',
    publish: 'listings.publish',
    feature: 'listings.feature',
    report: 'listings.report'
  },

  // Agent Management
  agents: {
    create: 'agents.create',
    read: 'agents.read',
    update: 'agents.update',
    delete: 'agents.delete',
    verify: 'agents.verify',
    feature: 'agents.feature'
  },

  // Package Management
  packages: {
    create: 'packages.create',
    read: 'packages.read',
    update: 'packages.update',
    delete: 'packages.delete'
  },

  // Coupon Management
  coupons: {
    create: 'coupons.create',
    read: 'coupons.read',
    update: 'coupons.update',
    delete: 'coupons.delete'
  },

  // Content Management
  blogs: {
    create: 'blogs.create',
    read: 'blogs.read',
    update: 'blogs.update',
    delete: 'blogs.delete',
    publish: 'blogs.publish'
  },

  banners: {
    create: 'banners.create',
    read: 'banners.read',
    update: 'banners.update',
    delete: 'banners.delete'
  },

  // FAQ Management
  faqs: {
    create: 'faqs.create',
    read: 'faqs.read',
    update: 'faqs.update',
    delete: 'faqs.delete'
  },

  // Support Management
  support: {
    create: 'support.create',
    read: 'support.read',
    update: 'support.update',
    delete: 'support.delete',
    assign: 'support.assign'
  },

  // Reports and Analytics
  reports: {
    create: 'reports.create',
    read: 'reports.read',
    delete: 'reports.delete'
  },

  analytics: {
    read: 'analytics.read'
  },

  // Settings
  settings: {
    company: {
      read: 'settings.company.read',
      update: 'settings.company.update'
    }
  },

  // Notifications
  notifications: {
    create: 'notifications.create',
    read: 'notifications.read',
    send: 'notifications.send'
  }
};

// Data access scopes
export const DATA_SCOPES = {
  GLOBAL: 'GLOBAL',     // Access to all data across companies
  COMPANY: 'COMPANY',   // Access to company data only
  BRANCH: 'BRANCH',     // Access to branch data only
  DEPARTMENT: 'DEPARTMENT', // Access to department data only
  SELF: 'SELF'          // Access to own data only
};

// Role definitions for real estate platform
export const ROLES = {
  SUPERADMIN: 'SUPERADMIN',
  COMPANY_ADMIN: 'COMPANY_ADMIN',
  REAL_ESTATE_AGENT: 'REAL_ESTATE_AGENT',
  PROPERTY_OWNER: 'PROPERTY_OWNER',
  CONTENT_MANAGER: 'CONTENT_MANAGER',
  SUPPORT_STAFF: 'SUPPORT_STAFF',
  MARKETING_MANAGER: 'MARKETING_MANAGER',
  FINANCE_MANAGER: 'FINANCE_MANAGER'
};

/**
 * Check if permission matches wildcard pattern
 * @param {string} permission - Permission to check
 * @param {string} pattern - Wildcard pattern (e.g., 'users.*', 'listings.create')
 * @returns {boolean}
 */
export const matchesWildcard = (permission, pattern) => {
  if (pattern === '*') return true;

  // Convert wildcard to regex
  const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
  return regex.test(permission);
};

/**
 * Merge permissions arrays, removing duplicates
 * @param {string[]} basePermissions - Base permissions
 * @param {string[]} additionalPermissions - Additional permissions to merge
 * @returns {string[]}
 */
export const mergePermissions = (basePermissions, additionalPermissions) => {
  const merged = [...basePermissions];

  for (const perm of additionalPermissions) {
    if (!merged.includes(perm)) {
      merged.push(perm);
    }
  }

  return merged;
};

/**
 * Check if user has required permission level
 * @param {string[]} userPermissions - User's permissions
 * @param {string} requiredPermission - Required permission
 * @returns {boolean}
 */
export const hasPermissionLevel = (userPermissions, requiredPermission) => {
  // Check for exact match
  if (userPermissions.includes(requiredPermission)) {
    return true;
  }

  // Check for wildcard matches
  for (const perm of userPermissions) {
    if (matchesWildcard(requiredPermission, perm)) {
      return true;
    }
  }

  return false;
};

/**
 * Get role hierarchy level (higher number = more permissions)
 * @param {string} role - Role name
 * @returns {number}
 */
export const getRoleHierarchy = (role) => {
  const hierarchy = {
    [ROLES.SUPERADMIN]: 100,
    [ROLES.COMPANY_ADMIN]: 80,
    [ROLES.CONTENT_MANAGER]: 60,
    [ROLES.MARKETING_MANAGER]: 60,
    [ROLES.FINANCE_MANAGER]: 60,
    [ROLES.SUPPORT_STAFF]: 40,
    [ROLES.REAL_ESTATE_AGENT]: 30,
    [ROLES.PROPERTY_OWNER]: 20
  };

  return hierarchy[role] || 0;
};

/**
 * Check if role A can assign role B
 * @param {string} assignerRole - Role doing the assignment
 * @param {string} targetRole - Role being assigned
 * @returns {boolean}
 */
export const canAssignRole = (assignerRole, targetRole) => {
  const assignerLevel = getRoleHierarchy(assignerRole);
  const targetLevel = getRoleHierarchy(targetRole);

  // Higher level roles can assign lower or equal level roles
  return assignerLevel > targetLevel;
};

export default {
  PERMISSION_TEMPLATES,
  RESOURCE_PERMISSIONS,
  DATA_SCOPES,
  ROLES,
  matchesWildcard,
  mergePermissions,
  hasPermissionLevel,
  getRoleHierarchy,
  canAssignRole
};