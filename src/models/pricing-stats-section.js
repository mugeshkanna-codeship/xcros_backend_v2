'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingStatsSection extends Model {
    static associate(models) {
      PricingStatsSection.belongsTo(models.Pricing, { foreignKey: 'pricingId', as: 'pricing' });
      PricingStatsSection.hasMany(models.PricingStat, { foreignKey: 'pricingStatsSectionId', as: 'stats' });
    }
  }
  PricingStatsSection.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pricingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'pricings',
        key: 'id'
      }
    },
    mainHeading: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PricingStatsSection',
    timestamps: true
  });
  return PricingStatsSection;
};