'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Market extends Model {
    static associate(models) {
      // Market associations if needed
    }
  }
  Market.init({
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
    modelName: 'Market',
    tableName: 'markets',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['category'] },
      { fields: ['domain'] }
    ]
  });
  return Market;
};
