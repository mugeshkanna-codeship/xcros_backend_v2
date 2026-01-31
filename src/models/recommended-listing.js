'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class RecommendedListing extends Model {
    static associate(models) {
      RecommendedListing.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      RecommendedListing.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      RecommendedListing.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
    }
  }
  RecommendedListing.init({
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
    categoryId: {
      type: DataTypes.UUID,
      references: { model: 'categories', key: 'id' }
    },
    cityId: {
      type: DataTypes.UUID,
      references: { model: 'cities', key: 'id' }
    },
    domain: DataTypes.STRING,
    placement: DataTypes.STRING,
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'RecommendedListing',
    tableName: 'recommended_listings',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['category_id'] },
      { fields: ['city_id'] },
      { fields: ['domain'] },
      { fields: ['priority'] }
    ]
  });
  return RecommendedListing;
};
