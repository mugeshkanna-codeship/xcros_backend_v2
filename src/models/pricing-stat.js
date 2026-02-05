'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingStat extends Model {
    static associate(models) {
      PricingStat.belongsTo(models.PricingStatsSection, { foreignKey: 'pricingStatsSectionId', as: 'statsSection' });
    }
  }
  PricingStat.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pricingStatsSectionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'PricingStatsSections',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PricingStat',
    timestamps: true
  });
  return PricingStat;
};