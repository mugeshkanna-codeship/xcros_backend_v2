'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingSlider extends Model {
    static associate(models) {
      PricingSlider.belongsTo(models.PricingSliderSection, { foreignKey: 'pricingSliderSectionId', as: 'sliderSection' });
    }
  }
  PricingSlider.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pricingSliderSectionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'PricingSliderSections',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PricingSlider',
    timestamps: true
  });
  return PricingSlider;
};