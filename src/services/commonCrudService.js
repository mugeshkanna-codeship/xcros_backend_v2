import rbacService from "./rbacService.js";
import logger from "../utils/logger.js";
import { Op } from "sequelize";

/**
 * Convert resource name to human-readable format
 * @param {string} resourceName - Resource name in camelCase or PascalCase
 * @returns {string} - Human-readable resource name
 */
const formatResourceName = (resourceName) => {
  if (!resourceName) return "Resource";

  // Convert camelCase/PascalCase to words with spaces
  const words = resourceName
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  return words.join(' ');
};

const commonCrudService = {
  /**
   * Create a new record
   * @param {Model} Model - Sequelize model
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {string} resourceName - Resource name for RBAC
   */
  createRecord: async (Model, req, res, resourceName) => {
    const hasAccess = rbacService.checkResourceAccess(
      req,
      resourceName,
      "create"
    );
    if (!hasAccess) {
      logger.warn(`Unauthorized access attempt to create ${resourceName}`, {
        user: req.uid || "unknown",
        role: req.role,
        company: req.company,
      });
      return res.status(403).json({ message: "Access denied" });
    }

    let bodyData = await rbacService.applyDataToBody(req, req.body);

    console.log("Body Data after RBAC application:", bodyData);
    // Filter bodyData to only include fields that exist in the model schema
    if (Model.rawAttributes) {
      const allowedFields = Object.keys(Model.rawAttributes);
      const filteredBodyData = {};
      for (const field of allowedFields) {
        if (bodyData[field] !== undefined) {
          let value = bodyData[field];

          // Sanitize numeric fields - convert empty strings to null
          const fieldType =
            Model.rawAttributes[field]?.type?.key ||
            Model.rawAttributes[field]?.type?.constructor?.key;
          if (
            (fieldType === "FLOAT" ||
              fieldType === "DOUBLE" ||
              fieldType === "INTEGER" ||
              fieldType === "BIGINT") &&
            value === ""
          ) {
            value = null;
          }

          filteredBodyData[field] = value;
        }
      }
      // Also include any additional fields that might be set by applyDataToBody
      for (const [key, value] of Object.entries(bodyData)) {
        if (!allowedFields.includes(key)) {
          // Only include RBAC-added fields (uid, company, branch)
          if (["uid", "company", "branch"].includes(key)) {
            filteredBodyData[key] = value;
          }
        }
      }
      bodyData = filteredBodyData;
    }

    try {
      console.log("Final Body Data to be created:", bodyData);
      let record = await Model.create(bodyData);

      logger.info(`${resourceName} created successfully`, {
        id: record.id,
        user: req.uid,
        company: req.company,
      });

      return res.status(201).json({
        message: `${formatResourceName(resourceName)} created successfully`,
        data: record,
      });
    } catch (error) {
      logger.error(`Error creating ${resourceName}`, {
        error: error.message,
        errorName: error.name,
        user: req.uid,
        company: req.company,
      });

      // Handle different types of Sequelize errors
      if (error.name && error.name.includes("Validation")) {
        const fieldErrors = error.errors
          ? error.errors.map((err) => ({
            field: err.path,
            message: err.message,
            value: err.value,
          }))
          : [];
        return res.status(400).json({
          message: `Validation error: ${fieldErrors
            .map((e) => `${e.field} - ${e.message}`)
            .join(", ")}`,
        });
      }

      if (error.name && error.name.includes("Unique")) {
        return res.status(409).json({
          message: `Duplicate entry: ${error.errors[0]?.message || "Unique constraint violated"
            }`,
        });
      }

      // Handle not null violations specifically
      if (error.message && error.message.includes("cannot be null")) {
        const fieldMatch = error.message.match(/(\w+)\.(\w+) cannot be null/);
        if (fieldMatch) {
          return res.status(400).json({
            message: `Required field '${fieldMatch[2]}' cannot be null`,
          });
        }
        return res.status(400).json({
          message: "Required field cannot be null",
        });
      }

      // Re-throw other errors
      return res.status(500).json({
        message: `Database error: ${error.message}`,
      });
    }
  },
  /**
   * Update an existing record
   * @param {Model} Model - Sequelize model
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {string} resourceName - Resource name for RBAC
   */
  updateRecord: async (Model, req, res, resourceName) => {
    const hasAccess = rbacService.checkResourceAccess(
      req,
      resourceName,
      "update"
    );
    if (!hasAccess) {
      logger.warn(`Unauthorized access attempt to update ${resourceName}`, {
        user: req.uid || "unknown",
        role: req.role,
        company: req.company,
        id: req.query.id,
      });
      return res.status(403).json({ message: "Access denied" });
    }

    const id = req.params.id || req.query.id;
    let record = await Model.findByPk(id);
    if (!record) {
      logger.warn(`${resourceName} not found for update`, {
        id: id,
        user: req.uid,
      });
      return res.status(404).json({ message: `${formatResourceName(resourceName)} not found` });
    }

    // Validate required fields if they are being updated
    if (
      Model.schema &&
      Model.schema.name &&
      Model.schema.name.allowNull === false
    ) {
      const newName = req.body.name;
      if (
        newName !== undefined &&
        (newName === null ||
          (typeof newName === "string" && newName.trim() === ""))
      ) {
        return res.status(400).json({
          message: `Required field 'name' cannot be null or empty for ${formatResourceName(resourceName)}`,
        });
      }
    }

    try {
      // Sanitize numeric fields in req.body - convert empty strings to null
      const sanitizedBody = { ...req.body };
      if (Model.rawAttributes) {
        for (const [field, value] of Object.entries(sanitizedBody)) {
          if (Model.rawAttributes[field]) {
            const fieldType =
              Model.rawAttributes[field]?.type?.key ||
              Model.rawAttributes[field]?.type?.constructor?.key;
            if (
              (fieldType === "FLOAT" ||
                fieldType === "DOUBLE" ||
                fieldType === "INTEGER" ||
                fieldType === "BIGINT") &&
              value === ""
            ) {
              sanitizedBody[field] = null;
            }
          }
        }
      }

      await record.update(sanitizedBody);

      logger.info(`${resourceName} updated successfully`, {
        id: req.params.id || req.query.id,
        user: req.uid,
        company: req.company,
      });

      return res.status(201).json({
        message: `${formatResourceName(resourceName)} updated successfully`,
        data: record,
      });
    } catch (error) {
      logger.error(`Error updating ${resourceName}`, {
        error: error.message,
        errorName: error.name,
        user: req.uid,
        company: req.company,
        id: req.query.id,
      });

      // Handle different types of Sequelize errors
      if (error.name && error.name.includes("Validation")) {
        const fieldErrors = error.errors
          ? error.errors.map((err) => ({
            field: err.path,
            message: err.message,
            value: err.value,
          }))
          : [];
        return res.status(400).json({
          message: `Validation error: ${fieldErrors
            .map((e) => `${e.field} - ${e.message}`)
            .join(", ")}`,
        });
      }

      if (error.name && error.name.includes("Unique")) {
        return res.status(409).json({
          message: `Duplicate entry: ${error.errors[0]?.message || "Unique constraint violated"
            }`,
        });
      }

      // Handle not null violations specifically
      if (error.message && error.message.includes("cannot be null")) {
        const fieldMatch = error.message.match(/(\w+)\.(\w+) cannot be null/);
        if (fieldMatch) {
          return res.status(400).json({
            message: `Required field '${fieldMatch[2]}' cannot be null`,
          });
        }
        return res.status(400).json({
          message: "Required field cannot be null",
        });
      }

      // Re-throw other errors
      return res.status(500).json({
        message: `Database error: ${error.message}`,
      });
    }
  },

  /**
   * Update a record by query (bypasses RBAC)
   * @param {Model} Model - Sequelize model
   * @param {Object} options - Options with where and data
   * @returns {Object} - Updated record
   */
  updateRecordByQuery: async (Model, options) => {
    const { where, data } = options;

    // Sanitize numeric fields in data - convert empty strings to null
    const sanitizedData = { ...data };
    if (Model.rawAttributes) {
      for (const [field, value] of Object.entries(sanitizedData)) {
        if (Model.rawAttributes[field]) {
          const fieldType =
            Model.rawAttributes[field]?.type?.key ||
            Model.rawAttributes[field]?.type?.constructor?.key;
          if (
            (fieldType === "FLOAT" ||
              fieldType === "DOUBLE" ||
              fieldType === "INTEGER" ||
              fieldType === "BIGINT") &&
            value === ""
          ) {
            sanitizedData[field] = null;
          }
        }
      }
    }

    try {
      const [affectedRows] = await Model.update(sanitizedData, { where });
      if (affectedRows === 0) {
        logger.warn(`No records updated for ${Model.name}`, { where });
        return null;
      }
      const updatedRecord = await Model.findOne({ where });
      logger.info(`${Model.name} updated successfully`, { where, data });
      return updatedRecord;
    } catch (error) {
      logger.error(`Error updating ${Model.name}`, {
        error: error.message,
        where,
        data,
      });
      throw error;
    }
  },

  /**
   * List records with server-side pagination and filtering
   * @param {Model} Model - Sequelize model
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {string} resourceName - Resource name for RBAC
   * @param {string|Object} actionOrOptions - Action string or options object
   * @param {Array} includes - Include options (if actionOrOptions is string)
   * @param {Object} additionalWhere - Additional where conditions (if actionOrOptions is string)
   */
  listRecordsSSR: async (
    Model,
    req,
    res,
    resourceName,
    actionOrOptions = {},
    includes = [],
    additionalWhere = {}
  ) => {
    let options = {};

    // Handle both calling patterns
    if (typeof actionOrOptions === "string") {
      // Old pattern: (Model, req, res, resourceName, action, includes, additionalWhere)
      options = { includes, additionalWhere };
    } else {
      // New pattern: (Model, req, res, resourceName, options)
      options = actionOrOptions;
    }

    const {
      searchFields = [],
      includes: optsIncludes = [],
      additionalWhere: optsAdditionalWhere = {},
      attributes = null,
    } = options;
    const finalIncludes = optsIncludes.length > 0 ? optsIncludes : includes;
    const finalAdditionalWhere =
      Reflect.ownKeys(optsAdditionalWhere).length > 0
        ? optsAdditionalWhere
        : additionalWhere;
    const { first, rows, sortField, sortOrder, globalFilter } = req.body;

    try {
      let where = await rbacService.generateAccessQuery(req);
      if (req.role === "SUPERADMIN") {
        where = {};
      }

      where = { ...where, ...finalAdditionalWhere };

      if (globalFilter && searchFields.length > 0) {
        const filterValue = globalFilter.toLowerCase().trim();
        if (filterValue.length > 0) {
          const globalFilterCondition = {
            [Op.or]: searchFields.map((field) => ({
              [field]: { [Op.iLike]: `%${filterValue}%` },
            })),
          };

          // If additionalWhere already has Op.or, combine with Op.and
          if (where[Op.or]) {
            const existingOr = where[Op.or];
            delete where[Op.or];
            where[Op.and] = [
              { [Op.or]: existingOr },
              globalFilterCondition,
            ];
          } else {
            where = { ...where, ...globalFilterCondition };
          }
        }
      }

      // Optimized count query without includes for better performance
      // Optimized count query without includes for better performance
      const totalRecords = await Model.count({ where, distinct: true });

      let order = [["updatedAt", "DESC"]];
      if (sortField) {
        order = [
          [sortField, sortOrder === 1 ? "ASC" : "DESC"],
          ["updatedAt", "DESC"],
        ];
      }

      const list = await Model.findAll({
        where,
        order,
        offset: first || 0,
        limit: Math.min(rows || 10, 100), // Cap at 100 records max
        include: finalIncludes,
        attributes,
        distinct: true,
        logging: false, // Disable SQL logging for performance
      });

      logger.info(`${resourceName} listed successfully (SSR)`, {
        user: req.uid,
        company: req.company,
        totalRecords,
        filters: { globalFilter, sortField, sortOrder },
      });

      if (options.transform) {
        const transformedData = await options.transform(list);
        return res.status(200).json({ data: transformedData, totalRecords });
      }

      return res.status(200).json({ data: list, totalRecords });
    } catch (error) {
      logger.error(`Error listing ${resourceName} (SSR)`, {
        error: error.message,
        user: req.uid,
        company: req.company,
      });

      return res.status(500).json({
        message: `Error retrieving ${formatResourceName(resourceName)}`,
        error: error.message,
      });
    }
  },

  /**
   * List all records
   * @param {Model} Model - Sequelize model
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {string} resourceName - Resource name for RBAC
   * @param {Object} options - Additional options
   */
  listRecords: async (Model, req, res, resourceName, options = {}) => {
    const { additionalWhere = {}, includes = [] } = options;
    const hasAccess = rbacService.checkResourceAccess(
      req,
      resourceName,
      "read"
    );
    if (!hasAccess) {
      logger.warn(`Unauthorized access attempt to list ${resourceName}`, {
        user: req.uid || "unknown",
        role: req.role,
        company: req.company,
      });
      return res.status(403).json({ message: "Access denied" });
    }

    try {
      let where = await rbacService.generateAccessQuery(req);
      if (req.role === "SUPERADMIN") {
        where = {};
      }
      where = { ...where, ...additionalWhere };

      // Extract attributes from options
      const { attributes } = options;

      const list = await Model.findAll({ where, include: includes, attributes });

      logger.info(`${resourceName} listed successfully`, {
        user: req.uid,
        company: req.company,
        count: list.length,
      });

      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      logger.error(`Error listing ${resourceName}`, {
        error: error.message,
        user: req.uid,
        company: req.company,
      });

      return res.status(500).json({
        message: `Error retrieving ${formatResourceName(resourceName)}`,
        error: error.message,
      });
    }
  },
  findOneByQuery: async (Model, query) => {
    const { where, include = [], attributes } = query;
    try {
      const record = await Model.findOne({ where, include, attributes });
      return record;
    } catch (error) {
      logger.error(`Error in custom findOne query for ${Model.name}`, {
        error: error.message,
        where,
      });
      throw error;
    }
  },

  /**
   * Find one record by ID
   * @param {Model} Model - Sequelize model
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {string} resourceName - Resource name for RBAC
   * @param {Object} options - Additional options
   */
  findOneRecord: async (Model, req, res, resourceName, options = {}) => {
    const { includes = [], attributes, additionalWhere = {} } = options;
    const hasAccess = rbacService.checkResourceAccess(
      req,
      resourceName,
      "read"
    );
    if (!hasAccess) {
      logger.warn(`Unauthorized access attempt to find ${resourceName}`, {
        user: req.uid || "unknown",
        role: req.role,
        company: req.company,
        id: req.params.id || req.query.id,
      });
      return res.status(403).json({ message: "Access denied" });
    }

    try {
      let where = { ...await rbacService.generateAccessQuery(req), ...additionalWhere };
      where.id = req.params.id || req.query.id;

      const record = await Model.findOne({
        where,
        include: includes,
        attributes,
      });
      if (!record) {
        logger.warn(`${resourceName} not found`, {
          id: req.params.id || req.query.id,
          user: req.uid,
        });
        return res.status(404).json({ message: `${formatResourceName(resourceName)} not found` });
      }

      logger.info(`${resourceName} found successfully`, {
        id: req.params.id || req.query.id,
        user: req.uid,
        company: req.company,
      });

      return res.status(200).json({
        data: record,
        success: true,
      });
    } catch (error) {
      logger.error(`Error retrieving ${resourceName}`, {
        error: error.message,
        user: req.uid,
        company: req.company,
        id: req.params.id || req.query.id,
      });

      return res.status(500).json({
        message: `Error retrieving ${formatResourceName(resourceName)}`,
        error: error.message,
      });
    }
  },

  /**
   * Delete a record
   * @param {Model} Model - Sequelize model
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {string} resourceName - Resource name for RBAC
   * @param {Array} checkLinks - Array of { model, field } to check for linked data
   */
  deleteRecord: async (Model, req, res, resourceName, checkLinks = [], options = {}) => {
    const { additionalWhere = {} } = options;
    const hasAccess = rbacService.checkResourceAccess(
      req,
      resourceName,
      "delete"
    );
    if (!hasAccess) {
      logger.warn(`Unauthorized access attempt to delete ${resourceName}`, {
        user: req.uid || "unknown",
        role: req.role,
        company: req.company,
        id: req.params.id || req.query.id,
      });
      return res.status(403).json({ message: "Access denied" });
    }

    try {
      const id = req.params.id || req.query.id;

      // Check if data is linked
      for (let link of checkLinks) {
        const exists = await link.model.findOne({
          where: { [link.field]: id },
        });
        if (exists) {
          logger.warn(`Cannot delete ${resourceName} - data is linked`, {
            id,
            user: req.uid,
            company: req.company,
            linkedModel: link.model.name,
          });
          return res.status(400).json({
            message: "Unable to delete, Data is linked",
          });
        }
      }

      let where = await rbacService.generateAccessQuery(req);
      where = { ...where, ...additionalWhere };
      where.id = id;

      const deleted = await Model.destroy({ where });
      if (!deleted) {
        logger.warn(`${resourceName} not found for deletion`, {
          id,
          user: req.uid,
        });
        return res.status(404).json({ message: `${formatResourceName(resourceName)} not found` });
      }

      logger.info(`${resourceName} deleted successfully`, {
        id,
        user: req.uid,
        company: req.company,
      });

      return res.status(200).json({
        message: `${formatResourceName(resourceName)} deleted successfully`,
      });
    } catch (error) {
      logger.error(`Error deleting ${resourceName}`, {
        error: error.message,
        user: req.uid,
        company: req.company,
        id: req.params.id || req.query.id,
      });

      if (error.name === "SequelizeForeignKeyConstraintError" || (error.original && error.original.code === "23503")) {
        return res.status(400).json({
          message: "Unable to delete, Data is linked",
        });
      }

      return res.status(500).json({
        message: `Error deleting ${formatResourceName(resourceName)}`,
        error: error.message,
      });
    }
  },
};

export default commonCrudService;