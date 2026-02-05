'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingFeature extends Model {
    static associate(models) {
      PricingFeature.belongsTo(models.PricingFeaturesSection, { foreignKey: 'pricingFeaturesSectionId', as: 'featuresSection' });
    }
  }
  PricingFeature.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pricingFeaturesSectionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'PricingFeaturesSections',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PricingFeature',
    timestamps: true
  });
  return PricingFeature;
};