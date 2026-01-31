'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ServiceMarketplace extends Model {
    static associate(models) {
      // ServiceMarketplace associations if needed
    }
  }
  ServiceMarketplace.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    url: DataTypes.STRING,
    image: DataTypes.STRING,
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ServiceMarketplace',
    tableName: 'service_marketplaces',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['category'] },
      { fields: ['domain'] }
    ]
  });
  return ServiceMarketplace;
};
