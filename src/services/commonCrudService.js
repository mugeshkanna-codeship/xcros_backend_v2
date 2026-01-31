import { logger } from '../utils/logger.js';
import { Op } from 'sequelize';

/**
 * Convert resource name to human-readable format
 * @param {string} resourceName - Resource name in camelCase or PascalCase
 * @returns {string} - Human-readable resource name
 */
const formatResourceName = (resourceName) => {
  if (!resourceName) return 'Resource';

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
   * @param {string} resourceName - Resource name for logging
   */
  createRecord: async (Model, req, res, resourceName) => {
    let bodyData = req.body;

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
            (fieldType === 'FLOAT' ||
              fieldType === 'DOUBLE' ||
              fieldType === 'INTEGER' ||
              fieldType === 'BIGINT') &&
            value === ''
          ) {
            value = null;
          }

          filteredBodyData[field] = value;
        }
      }
      bodyData = filteredBodyData;
    }

    try {
      let record = await Model.create(bodyData);

      logger.info(`${resourceName} created successfully`, {
        id: record.id,
        user: req.user?.id || 'anonymous'
      });

      return res.status(201).json({
        message: `${formatResourceName(resourceName)} created successfully`,
        data: record,
      });
    } catch (error) {
      logger.error(`Error creating ${resourceName}`, {
        error: error.message,
        errorName: error.name,
        user: req.user?.id || 'anonymous'
      });

      // Handle different types of Sequelize errors
      if (error.name && error.name.includes('Validation')) {
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
            .join(', ')}`,
        });
      }

      if (error.name && error.name.includes('Unique')) {
        return res.status(409).json({
          message: `Duplicate entry: ${error.errors[0]?.message || 'Unique constraint violated'}`,
        });
      }

      // Handle not null violations specifically
      if (error.message && error.message.includes('cannot be null')) {
        const fieldMatch = error.message.match(/(\w+)\.(\w+) cannot be null/);
        if (fieldMatch) {
          return res.status(400).json({
            message: `Required field '${fieldMatch[2]}' cannot be null`,
          });
        }
        return res.status(400).json({
          message: 'Required field cannot be null',
        });
      }

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
   * @param {string} resourceName - Resource name for logging
   */
  updateRecord: async (Model, req, res, resourceName) => {
    const id = req.params.id || req.query.id;
    let record = await Model.findByPk(id);
    if (!record) {
      logger.warn(`${resourceName} not found for update`, {
        id: id,
        user: req.user?.id || 'anonymous'
      });
      return res.status(404).json({ message: `${formatResourceName(resourceName)} not found` });
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
              (fieldType === 'FLOAT' ||
                fieldType === 'DOUBLE' ||
                fieldType === 'INTEGER' ||
                fieldType === 'BIGINT') &&
              value === ''
            ) {
              sanitizedBody[field] = null;
            }
          }
        }
      }

      await record.update(sanitizedBody);

      logger.info(`${resourceName} updated successfully`, {
        id: req.params.id || req.query.id,
        user: req.user?.id || 'anonymous'
      });

      return res.status(200).json({
        message: `${formatResourceName(resourceName)} updated successfully`,
        data: record,
      });
    } catch (error) {
      logger.error(`Error updating ${resourceName}`, {
        error: error.message,
        errorName: error.name,
        user: req.user?.id || 'anonymous',
        id: req.query.id,
      });

      // Handle different types of Sequelize errors
      if (error.name && error.name.includes('Validation')) {
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
            .join(', ')}`,
        });
      }

      if (error.name && error.name.includes('Unique')) {
        return res.status(409).json({
          message: `Duplicate entry: ${error.errors[0]?.message || 'Unique constraint violated'}`,
        });
      }

      // Handle not null violations specifically
      if (error.message && error.message.includes('cannot be null')) {
        const fieldMatch = error.message.match(/(\w+)\.(\w+) cannot be null/);
        if (fieldMatch) {
          return res.status(400).json({
            message: `Required field '${fieldMatch[2]}' cannot be null`,
          });
        }
        return res.status(400).json({
          message: 'Required field cannot be null',
        });
      }

      return res.status(500).json({
        message: `Database error: ${error.message}`,
      });
    }
  },

  /**
   * List records with server-side pagination and filtering
   * @param {Model} Model - Sequelize model
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {string} resourceName - Resource name for logging
   * @param {Object} options - Additional options
   */
  listRecordsSSR: async (Model, req, res, resourceName, options = {}) => {
    const { searchFields = [], includes = [], additionalWhere = {}, attributes = null } = options;
    const { first, rows, sortField, sortOrder, globalFilter } = req.body;

    try {
      let where = { ...additionalWhere };

      if (globalFilter && searchFields.length > 0) {
        const filterValue = globalFilter.toLowerCase().trim();
        if (filterValue.length > 0) {
          const globalFilterCondition = {
            [Op.or]: searchFields.map((field) => ({
              [field]: { [Op.iLike]: `%${filterValue}%` },
            })),
          };

          where = { ...where, ...globalFilterCondition };
        }
      }

      const totalRecords = await Model.count({ where });

      let order = [['updatedAt', 'DESC']];
      if (sortField) {
        order = [
          [sortField, sortOrder === 1 ? 'ASC' : 'DESC'],
          ['updatedAt', 'DESC'],
        ];
      }

      const list = await Model.findAll({
        where,
        order,
        offset: first || 0,
        limit: Math.min(rows || 10, 100), // Cap at 100 records max
        include: includes,
        attributes,
        logging: false, // Disable SQL logging for performance
      });

      logger.info(`${resourceName} listed successfully (SSR)`, {
        user: req.user?.id || 'anonymous',
        totalRecords,
        filters: { globalFilter, sortField, sortOrder },
      });

      return res.status(200).json({ data: list, totalRecords });
    } catch (error) {
      logger.error(`Error listing ${resourceName} (SSR)`, {
        error: error.message,
        user: req.user?.id || 'anonymous'
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
   * @param {string} resourceName - Resource name for logging
   * @param {Object} options - Additional options
   */
  listRecords: async (Model, req, res, resourceName, options = {}) => {
    const { additionalWhere = {}, includes = [], attributes } = options;

    try {
      let where = { ...additionalWhere };

      const list = await Model.findAll({ where, include: includes, attributes });

      logger.info(`${resourceName} listed successfully`, {
        user: req.user?.id || 'anonymous',
        count: list.length,
      });

      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      logger.error(`Error listing ${resourceName}`, {
        error: error.message,
        user: req.user?.id || 'anonymous'
      });

      return res.status(500).json({
        message: `Error retrieving ${formatResourceName(resourceName)}`,
        error: error.message,
      });
    }
  },

  /**
   * Find one record by ID
   * @param {Model} Model - Sequelize model
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {string} resourceName - Resource name for logging
   * @param {Object} options - Additional options
   */
  findOneRecord: async (Model, req, res, resourceName, options = {}) => {
    const { includes = [], attributes } = options;

    try {
      const where = { id: req.params.id || req.query.id };

      const record = await Model.findOne({
        where,
        include: includes,
        attributes,
      });
      if (!record) {
        logger.warn(`${resourceName} not found`, {
          id: req.params.id || req.query.id,
          user: req.user?.id || 'anonymous'
        });
        return res.status(404).json({ message: `${formatResourceName(resourceName)} not found` });
      }

      logger.info(`${resourceName} found successfully`, {
        id: req.params.id || req.query.id,
        user: req.user?.id || 'anonymous'
      });

      return res.status(200).json({
        data: record,
        success: true,
      });
    } catch (error) {
      logger.error(`Error retrieving ${resourceName}`, {
        error: error.message,
        user: req.user?.id || 'anonymous',
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
   * @param {string} resourceName - Resource name for logging
   * @param {Array} checkLinks - Array of { model, field } to check for linked data
   */
  deleteRecord: async (Model, req, res, resourceName, checkLinks = []) => {
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
            user: req.user?.id || 'anonymous',
            linkedModel: link.model.name,
          });
          return res.status(400).json({
            message: 'Unable to delete, Data is linked',
          });
        }
      }

      const deleted = await Model.destroy({ where: { id } });
      if (!deleted) {
        logger.warn(`${resourceName} not found for deletion`, {
          id,
          user: req.user?.id || 'anonymous'
        });
        return res.status(404).json({ message: `${formatResourceName(resourceName)} not found` });
      }

      logger.info(`${resourceName} deleted successfully`, {
        id,
        user: req.user?.id || 'anonymous'
      });

      return res.status(200).json({
        message: `${formatResourceName(resourceName)} deleted successfully`,
      });
    } catch (error) {
      logger.error(`Error deleting ${resourceName}`, {
        error: error.message,
        user: req.user?.id || 'anonymous',
        id: req.params.id || req.query.id,
      });

      if (error.name === 'SequelizeForeignKeyConstraintError' || (error.original && error.original.code === '23503')) {
        return res.status(400).json({
          message: 'Unable to delete, Data is linked',
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