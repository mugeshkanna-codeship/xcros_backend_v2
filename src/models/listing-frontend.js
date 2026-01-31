'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingFrontend extends Model {
    static associate(models) {
      ListingFrontend.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      ListingFrontend.belongsTo(models.PrimaryCategory, { foreignKey: 'primaryCategoryId', as: 'primaryCategory' });
      ListingFrontend.belongsTo(models.SecondaryCategory, { foreignKey: 'secondaryCategoryId', as: 'secondaryCategory' });
      ListingFrontend.belongsTo(models.TertiaryCategory, { foreignKey: 'tertiaryCategoryId', as: 'tertiaryCategory' });
      ListingFrontend.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country' });
      ListingFrontend.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
      ListingFrontend.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
      ListingFrontend.belongsTo(models.Pincode, { foreignKey: 'pincodeId', as: 'pincode' });
      ListingFrontend.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
    }
  }
  ListingFrontend.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    tertiaryCategoryId: {
      type: DataTypes.UUID,
      references: { model: 'tertiary_categories', key: 'id' }
    },
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
    domain: DataTypes.STRING,
    imageId: {
      type: DataTypes.UUID,
      references: { model: 'media', key: 'id' }
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    content: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'Complex listing frontend data stored as JSONB'
    }
  }, {
    sequelize,
    modelName: 'ListingFrontend',
    tableName: 'listing_frontends',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['category_id'] },
      { fields: ['city_id'] },
      { fields: ['pincode_id'] },
      { fields: ['domain'] }
    ]
  });
  return ListingFrontend;
};
