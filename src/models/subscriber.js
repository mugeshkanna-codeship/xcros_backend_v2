'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Subscriber extends Model {
    static associate(models) {
      Subscriber.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Subscriber.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      Subscriber.belongsTo(models.Pincode, { foreignKey: 'pincodeId', as: 'pincode' });
    }
  }
  Subscriber.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    
    // Relations
    userId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    listingId: {
      type: DataTypes.UUID,
      references: { model: 'listings', key: 'id' }
    },
    pincodeId: {
      type: DataTypes.UUID,
      references: { model: 'pincodes', key: 'id' }
    },
    
    // Subscription details
    type: {
      type: DataTypes.ENUM('GENERAL', 'LISTING_UPDATES', 'AREA_UPDATES', 'PROMOTIONAL', 'NEWSLETTER'),
      allowNull: false
    },
    
    status: {
      type: DataTypes.ENUM('ACTIVE', 'UNSUBSCRIBED', 'BOUNCED', 'COMPLAINED'),
      defaultValue: 'ACTIVE'
    },
    
    // Preferences
    frequency: {
      type: DataTypes.ENUM('INSTANT', 'DAILY', 'WEEKLY', 'MONTHLY'),
      defaultValue: 'WEEKLY'
    },
    
    // Subscription management
    subscribedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    unsubscribedAt: DataTypes.DATE,
    unsubscribeReason: DataTypes.STRING,
    
    // Verification
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verifiedAt: DataTypes.DATE,
    verificationToken: DataTypes.STRING,
    
    // Tracking
    source: DataTypes.STRING, // Where they subscribed from
    ipAddress: DataTypes.INET,
    userAgent: DataTypes.STRING,
    
    // Engagement
    lastEmailSent: DataTypes.DATE,
    lastEmailOpened: DataTypes.DATE,
    lastEmailClicked: DataTypes.DATE,
    emailsSent: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    emailsOpened: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    emailsClicked: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Subscriber',
    tableName: 'subscribers',
    underscored: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      { fields: ['email'] },
      { fields: ['user_id'] },
      { fields: ['listing_id'] },
      { fields: ['pincode_id'] },
      { fields: ['type'] },
      { fields: ['status'] },
      { fields: ['subscribed_at'] },
      { unique: true, fields: ['email', 'type', 'listing_id'] }
    ]
  });
  return Subscriber;
};
