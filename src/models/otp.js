'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Otp extends Model {
    static associate(models) {
      Otp.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Otp.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    
    identifier: {
      type: DataTypes.STRING,
      allowNull: false // email or phone
    },
    
    identifierType: {
      type: DataTypes.ENUM('EMAIL', 'PHONE'),
      allowNull: false
    },
    
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    purpose: {
      type: DataTypes.ENUM('REGISTRATION', 'LOGIN', 'PASSWORD_RESET', 'EMAIL_VERIFICATION', 'PHONE_VERIFICATION', 'TWO_FACTOR'),
      allowNull: false
    },
    
    status: {
      type: DataTypes.ENUM('PENDING', 'VERIFIED', 'EXPIRED', 'INVALID'),
      defaultValue: 'PENDING'
    },
    
    // Expiry
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    
    // Usage tracking
    attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    maxAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 3
    },
    
    // Verification tracking
    verifiedAt: DataTypes.DATE,
    
    // Metadata
    ipAddress: DataTypes.INET,
    userAgent: DataTypes.STRING,
    
    // Delivery tracking
    sentAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deliveryMethod: DataTypes.STRING, // SMS, Email
    deliveryStatus: DataTypes.STRING,
    deliveryResponse: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Otp',
    tableName: 'otps',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['identifier'] },
      { fields: ['code'] },
      { fields: ['purpose'] },
      { fields: ['status'] },
      { fields: ['expires_at'] },
      { fields: ['identifier', 'purpose'] }
    ]
  });
  return Otp;
};
