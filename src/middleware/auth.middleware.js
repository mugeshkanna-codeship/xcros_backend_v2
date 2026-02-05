import jwt from 'jsonwebtoken';
import rbacService from '../services/rbacService.js';

/**
 * JWT Token Authentication Middleware
 * Verifies JWT token from Authorization header
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

/**
 * RBAC Permission Check Middleware
 * Checks if user has specific permission for resource and action
 */
export const checkRBAC = (resource, action) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const hasPermission = await rbacService.checkPermission(userId, resource, action);

      if (!hasPermission) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      next();
    } catch (error) {
      console.error('RBAC check error:', error);
      res.status(500).json({ error: 'Authorization check failed' });
    }
  };
};

/**
 * Authentication and RBAC Context Middleware
 * Verifies JWT token and sets RBAC context (uid, role, permissions, dataScope)
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // Verify JWT token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = decoded.id;
    req.role = decoded.role;
    req.permissions = decoded.permissions;
    req.dataScope = decoded.dataScope;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * Require Specific Permission Middleware
 * Ensures user has a specific permission before proceeding
 */
export const requirePermission = (permission) => {
  return async (req, res, next) => {
    try {
      const hasPermission = await rbacService.hasPermission(req.uid, permission);
      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to perform this action'
        });
      }
      next();
    } catch (error) {
      console.error('Permission check error:', error);
      res.status(500).json({
        success: false,
        message: 'Authorization check failed'
      });
    }
  };
};

/**
 * Require Resource Access Middleware
 * Ensures user has access to perform specific action on a resource
 */
export const requireResourceAccess = (resource, action) => {
  return async (req, res, next) => {
    try {
      const hasAccess = await rbacService.checkResourceAccess(req, resource, action);
      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'You do not have access to this resource'
        });
      }
      next();
    } catch (error) {
      console.error('Resource access check error:', error);
      res.status(500).json({
        success: false,
        message: 'Authorization check failed'
      });
    }
  };
};