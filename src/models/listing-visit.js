'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingVisit extends Model {
    static associate(models) {
      ListingVisit.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      ListingVisit.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  ListingVisit.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'listings', key: 'id' }
    },
    sessionId: DataTypes.STRING,
    ipAddress: DataTypes.INET,
    userAgent: DataTypes.STRING,
    referrer: DataTypes.STRING,
    
    // Visit details
    duration: DataTypes.INTEGER, // seconds
    pageViews: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    bounced: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    // Geo data
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    
    // Device info
    deviceType: DataTypes.STRING,
    browser: DataTypes.STRING,
    operatingSystem: DataTypes.STRING,
    
    // UTM parameters
    utmSource: DataTypes.STRING,
    utmMedium: DataTypes.STRING,
    utmCampaign: DataTypes.STRING,
    utmTerm: DataTypes.STRING,
    utmContent: DataTypes.STRING,
    
    visitedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'ListingVisit',
    tableName: 'listing_visits',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['listing_id'] },
      { fields: ['session_id'] },
      { fields: ['ip_address'] },
      { fields: ['visited_at'] },
      { fields: ['listing_id', 'visited_at'] }
    ]
  });
  return ListingVisit;
};
