'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Support extends Model {
    static associate(models) {
      Support.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Support.belongsTo(models.User, { foreignKey: 'assignedToId', as: 'assignedTo' });
      Support.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      Support.hasMany(models.SupportMessage, { foreignKey: 'ticketId', as: 'messages' });
    }
  }
  Support.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    ticketNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    
    // User info
    userId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    customerName: DataTypes.STRING,
    customerEmail: DataTypes.STRING,
    customerPhone: DataTypes.STRING,
    
    // Related entities
    listingId: {
      type: DataTypes.UUID,
      references: { model: 'listings', key: 'id' }
    },
    
    // Ticket details
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    
    category: {
      type: DataTypes.ENUM('TECHNICAL', 'BILLING', 'GENERAL', 'ACCOUNT', 'LISTING', 'BUG_REPORT', 'FEATURE_REQUEST'),
      allowNull: false
    },
    
    priority: {
      type: DataTypes.ENUM('LOW', 'NORMAL', 'HIGH', 'URGENT'),
      defaultValue: 'NORMAL'
    },
    
    status: {
      type: DataTypes.ENUM('OPEN', 'IN_PROGRESS', 'PENDING_USER', 'RESOLVED', 'CLOSED'),
      defaultValue: 'OPEN'
    },
    
    // Assignment
    assignedToId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    assignedAt: DataTypes.DATE,
    
    // Resolution
    resolution: DataTypes.TEXT,
    resolvedAt: DataTypes.DATE,
    closedAt: DataTypes.DATE,
    
    // SLA tracking
    responseTime: DataTypes.INTEGER, // minutes
    resolutionTime: DataTypes.INTEGER, // minutes
    firstResponseAt: DataTypes.DATE,
    
    // Satisfaction
    satisfactionRating: DataTypes.INTEGER, // 1-5
    satisfactionFeedback: DataTypes.TEXT,
    
    // Internal
    internalNotes: DataTypes.TEXT,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    
    // Metadata
    ipAddress: DataTypes.INET,
    userAgent: DataTypes.STRING,
    source: {
      type: DataTypes.ENUM('WEB', 'EMAIL', 'PHONE', 'CHAT', 'MOBILE_APP'),
      defaultValue: 'WEB'
    }
  }, {
    sequelize,
    modelName: 'Support',
    tableName: 'support_tickets',
    underscored: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      { fields: ['ticket_number'] },
      { fields: ['user_id'] },
      { fields: ['listing_id'] },
      { fields: ['assigned_to_id'] },
      { fields: ['status'] },
      { fields: ['priority'] },
      { fields: ['category'] },
      { fields: ['created_at'] }
    ]
  });
  return Support;
};
