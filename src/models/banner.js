'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Banner extends Model {
    static associate(models) {
      Banner.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
      Banner.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
      Banner.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  Banner.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subtitle: DataTypes.STRING,
    description: DataTypes.TEXT,
    
    // Display settings
    type: {
      type: DataTypes.ENUM('HOME_SLIDER', 'CATEGORY_BANNER', 'PROMOTIONAL', 'LISTING_HIGHLIGHT'),
      allowNull: false
    },
    
    position: {
      type: DataTypes.ENUM('TOP', 'MIDDLE', 'BOTTOM', 'SIDEBAR'),
      defaultValue: 'TOP'
    },
    
    // Media
    imageId: {
      type: DataTypes.UUID,
      references: { model: 'media', key: 'id' }
    },
    
    // Action
    actionType: {
      type: DataTypes.ENUM('URL', 'LISTING', 'CATEGORY', 'SEARCH'),
      defaultValue: 'URL'
    },
    actionUrl: DataTypes.STRING,
    actionText: DataTypes.STRING,
    listingId: {
      type: DataTypes.UUID,
      references: { model: 'listings', key: 'id' }
    },
    
    // Visibility
    status: {
      type: DataTypes.ENUM('DRAFT', 'ACTIVE', 'INACTIVE', 'EXPIRED'),
      defaultValue: 'DRAFT'
    },
    
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    
    // Targeting
    targetAudience: DataTypes.JSONB, // {cities: [], categories: [], userTypes: []}
    
    // Display order
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    
    // Engagement tracking
    impressions: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    
    // Creator
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    
    // Internal
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Banner',
    tableName: 'banners',
    underscored: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      { fields: ['type'] },
      { fields: ['status'] },
      { fields: ['start_date', 'end_date'] },
      { fields: ['created_by'] },
      { fields: ['sort_order'] }
    ]
  });
  return Banner;
};
