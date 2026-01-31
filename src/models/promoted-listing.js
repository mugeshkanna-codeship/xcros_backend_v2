'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PromotedListing extends Model {
    static associate(models) {
      PromotedListing.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      PromotedListing.belongsTo(models.PrimaryCategory, { foreignKey: 'primaryCategoryId', as: 'primaryCategory' });
      PromotedListing.belongsTo(models.SecondaryCategory, { foreignKey: 'secondaryCategoryId', as: 'secondaryCategory' });
      PromotedListing.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country' });
      PromotedListing.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
      PromotedListing.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
      PromotedListing.belongsTo(models.Pincode, { foreignKey: 'pincodeId', as: 'pincode' });
    }
  }
  PromotedListing.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    listingIds: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of listing IDs to promote'
    },
    categoryId: {
      type: DataTypes.UUID,
      references: { model: 'categories', key: 'id' }
    },
    primaryCategoryId: {
      type: DataTypes.UUID,
      references: { model: 'primary_categories', key: 'id' }
    },
    secondaryCategoryId: {
      type: DataTypes.UUID,
      references: { model: 'secondary_categories', key: 'id' }
    },
    domain: DataTypes.STRING,
    countryId: {
      type: DataTypes.UUID,
      references: { model: 'countries', key: 'id' }
    },
    stateId: {
      type: DataTypes.UUID,
      references: { model: 'states', key: 'id' }
    },
    cityId: {
      type: DataTypes.UUID,
      references: { model: 'cities', key: 'id' }
    },
    pincodeId: {
      type: DataTypes.UUID,
      references: { model: 'pincodes', key: 'id' }
    },
    placement: DataTypes.STRING,
    description: DataTypes.TEXT,
    showInCity: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    showInPincode: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    from: DataTypes.DATE,
    to: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PromotedListing',
    tableName: 'promoted_listings',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['category_id'] },
      { fields: ['city_id'] },
      { fields: ['pincode_id'] },
      { fields: ['domain'] },
      { fields: ['placement'] },
      { fields: ['from', 'to'] }
    ]
  });
  return PromotedListing;
};
