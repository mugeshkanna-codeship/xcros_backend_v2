'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class FaqSecondary extends Model {
    static associate(models) {
      FaqSecondary.belongsTo(models.FaqPrimary, { foreignKey: 'primaryId', as: 'primary' });
      FaqSecondary.hasMany(models.FaqContent, { foreignKey: 'secondaryId', as: 'contents' });
    }
  }
  FaqSecondary.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    primaryId: {
      type: DataTypes.UUID,
      references: { model: 'faq_primaries', key: 'id' }
    },
    name: DataTypes.STRING,
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FaqSecondary',
    tableName: 'faq_secondaries',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['primary_id'] },
      { fields: ['domain'] }
    ]
  });
  return FaqSecondary;
};
