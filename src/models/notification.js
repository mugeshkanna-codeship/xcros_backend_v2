'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Notification.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
      Notification.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  Notification.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    senderId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    
    // Content
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    
    type: {
      type: DataTypes.ENUM(
        'SYSTEM', 'BOOKING', 'REVIEW', 'MESSAGE', 'LISTING_UPDATE', 'PROMOTION', 
        'REMINDER', 'WELCOME', 'VERIFICATION', 'PASSWORD_RESET', 'PAYMENT'
      ),
      allowNull: false
    },
    
    // Priority and status
    priority: {
      type: DataTypes.ENUM('LOW', 'NORMAL', 'HIGH', 'URGENT'),
      defaultValue: 'NORMAL'
    },
    
    status: {
      type: DataTypes.ENUM('UNREAD', 'READ', 'ARCHIVED'),
      defaultValue: 'UNREAD'
    },
    
    // Related entities
    listingId: {
      type: DataTypes.UUID,
      references: { model: 'listings', key: 'id' }
    },
    relatedEntityType: DataTypes.STRING, // booking, review, etc.
    relatedEntityId: DataTypes.UUID,
    
    // Action
    actionUrl: DataTypes.STRING,
    actionText: DataTypes.STRING,
    
    // Delivery channels
    channels: DataTypes.JSONB, // {email: true, push: true, sms: false}
    
    // Tracking
    readAt: DataTypes.DATE,
    archivedAt: DataTypes.DATE,
    
    // Email tracking
    emailSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    emailSentAt: DataTypes.DATE,
    emailOpened: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    emailOpenedAt: DataTypes.DATE,
    
    // Push notification tracking
    pushSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    pushSentAt: DataTypes.DATE,
    pushDelivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    // SMS tracking
    smsSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    smsSentAt: DataTypes.DATE,
    
    // Scheduling
    scheduledFor: DataTypes.DATE,
    
    // Metadata
    metadata: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    underscored: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['sender_id'] },
      { fields: ['listing_id'] },
      { fields: ['type'] },
      { fields: ['status'] },
      { fields: ['priority'] },
      { fields: ['created_at'] },
      { fields: ['scheduled_for'] },
      { fields: ['user_id', 'status'] }
    ]
  });
  return Notification;
};
