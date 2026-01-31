'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingGallery extends Model {
    static associate(models) {
      ListingGallery.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      ListingGallery.belongsTo(models.Media, { foreignKey: 'mediaId', as: 'media' });
    }
  }
  ListingGallery.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'listings', key: 'id' }
    },
    mediaId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'media', key: 'id' }
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    altText: DataTypes.STRING,
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    category: {
      type: DataTypes.ENUM('MAIN', 'INTERIOR', 'EXTERIOR', 'PRODUCT', 'TEAM', 'CERTIFICATE', 'OTHER'),
      defaultValue: 'OTHER'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ListingGallery',
    tableName: 'listing_galleries',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['media_id'] },
      { fields: ['category'] },
      { fields: ['sort_order'] }
    ]
  });
  return ListingGallery;
};
