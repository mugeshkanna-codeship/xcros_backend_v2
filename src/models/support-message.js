'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SupportMessage extends Model {
    static associate(models) {
      SupportMessage.belongsTo(models.Support, { foreignKey: 'ticketId', as: 'ticket' });
      SupportMessage.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
    }
  }
  SupportMessage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    ticketId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'support_tickets', key: 'id' }
    },
    authorId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    
    type: {
      type: DataTypes.ENUM('USER_MESSAGE', 'AGENT_REPLY', 'SYSTEM_MESSAGE', 'INTERNAL_NOTE'),
      allowNull: false
    },
    
    isInternal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    // Message metadata
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    readAt: DataTypes.DATE,
    
    // Attachments (JSON array of media IDs)
    attachments: DataTypes.JSONB,
    
    // Tracking
    ipAddress: DataTypes.INET,
    userAgent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SupportMessage',
    tableName: 'support_messages',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['ticket_id'] },
      { fields: ['author_id'] },
      { fields: ['type'] },
      { fields: ['created_at'] }
    ]
  });
  return SupportMessage;
};
