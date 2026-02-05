'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingSliderSection extends Model {
    static associate(models) {
      PricingSliderSection.belongsTo(models.Pricing, { foreignKey: 'pricingId', as: 'pricing' });
      PricingSliderSection.hasMany(models.PricingSlider, { foreignKey: 'pricingSliderSectionId', as: 'sliders' });
    }
  }
  PricingSliderSection.init({
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
    },
    subHeading: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PricingSliderSection',
    timestamps: true
  });
  return PricingSliderSection;
};