'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PromotedProduct extends Model {
    static associate(models) {
      PromotedProduct.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      PromotedProduct.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country' });
      PromotedProduct.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
      PromotedProduct.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
      PromotedProduct.belongsTo(models.Pincode, { foreignKey: 'pincodeId', as: 'pincode' });
    }
  }
  PromotedProduct.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    productIds: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of product IDs to promote'
    },
    categoryId: {
      type: DataTypes.UUID,
      references: { model: 'categories', key: 'id' }
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
    from: DataTypes.DATE,
    to: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PromotedProduct',
    tableName: 'promoted_products',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['category_id'] },
      { fields: ['city_id'] },
      { fields: ['domain'] },
      { fields: ['placement'] },
      { fields: ['from', 'to'] }
    ]
  });
  return PromotedProduct;
};
