'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingService extends Model {
    static associate(models) {
      PricingService.belongsTo(models.Pricing, { foreignKey: 'pricingId', as: 'pricing' });
      PricingService.hasMany(models.PricingServiceDropdown, { foreignKey: 'pricingServiceId', as: 'dropdowns' });
    }
  }
  PricingService.init({
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
    modelName: 'PricingService',
    timestamps: true
  });
  return PricingService;
};