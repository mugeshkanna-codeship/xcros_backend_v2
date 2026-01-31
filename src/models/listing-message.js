'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingMessage extends Model {
    static associate(models) {
      ListingMessage.belongsTo(models.User, { foreignKey: 'fromUserId', as: 'fromUser' });
      ListingMessage.belongsTo(models.User, { foreignKey: 'toUserId', as: 'toUser' });
      ListingMessage.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      ListingMessage.belongsTo(models.ListingMessage, { foreignKey: 'parentId', as: 'parent' });
      ListingMessage.hasMany(models.ListingMessage, { foreignKey: 'parentId', as: 'replies' });
    }
  }
  ListingMessage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    fromUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    toUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'listings', key: 'id' }
    },
    parentId: {
      type: DataTypes.UUID,
      references: { model: 'listing_messages', key: 'id' }
    },
    
    subject: DataTypes.STRING,
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    
    type: {
      type: DataTypes.ENUM('INQUIRY', 'QUOTE_REQUEST', 'BOOKING_REQUEST', 'GENERAL', 'COMPLAINT'),
      defaultValue: 'GENERAL'
    },
    
    status: {
      type: DataTypes.ENUM('UNREAD', 'READ', 'REPLIED', 'ARCHIVED'),
      defaultValue: 'UNREAD'
    },
    
    // Contact details (if provided)
    contactName: DataTypes.STRING,
    contactEmail: DataTypes.STRING,
    contactPhone: DataTypes.STRING,
    
    // Message metadata
    readAt: DataTypes.DATE,
    repliedAt: DataTypes.DATE,
    archivedAt: DataTypes.DATE,
    
    // Tracking
    ipAddress: DataTypes.INET,
    userAgent: DataTypes.STRING,
    referrer: DataTypes.STRING,
    
    isSpam: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    spamScore: DataTypes.DECIMAL(3, 2),
    
    // Auto-response
    autoResponseSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    // Priority
    priority: {
      type: DataTypes.ENUM('LOW', 'NORMAL', 'HIGH', 'URGENT'),
      defaultValue: 'NORMAL'
    },
    
    // Internal notes
    internalNotes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ListingMessage',
    tableName: 'listing_messages',
    underscored: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      { fields: ['from_user_id'] },
      { fields: ['to_user_id'] },
      { fields: ['listing_id'] },
      { fields: ['parent_id'] },
      { fields: ['status'] },
      { fields: ['type'] },
      { fields: ['created_at'] },
      { fields: ['listing_id', 'status'] }
    ]
  });
  return ListingMessage;
};
