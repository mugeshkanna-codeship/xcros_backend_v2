'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      // Product categories for e-commerce functionality
    }
  }
  ProductCategory.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    active: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    icon: DataTypes.STRING,
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductCategory',
    tableName: 'product_categories',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['slug'] },
      { fields: ['active'] },
      { fields: ['domain'] }
    ]
  });
  return ProductCategory;
};
