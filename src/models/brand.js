'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      // Brand associations if needed
    }
  }
  Brand.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    brandName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logo: DataTypes.STRING,
    description: DataTypes.TEXT,
    domain: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brands',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['brand_name'] },
      { fields: ['domain'] },
      { fields: ['is_active'] }
    ]
  });
  return Brand;
};
