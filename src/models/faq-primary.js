'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class FaqPrimary extends Model {
    static associate(models) {
      FaqPrimary.hasMany(models.FaqSecondary, { foreignKey: 'primaryId', as: 'secondaries' });
      FaqPrimary.hasMany(models.FaqContent, { foreignKey: 'primaryId', as: 'contents' });
    }
  }
  FaqPrimary.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM('AGENT', 'USER')
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FaqPrimary',
    tableName: 'faq_primaries',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['type'] },
      { fields: ['domain'] }
    ]
  });
  return FaqPrimary;
};
