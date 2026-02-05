'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingAbout extends Model {
    static associate(models) {
      PricingAbout.belongsTo(models.Pricing, { foreignKey: 'pricingId', as: 'pricing' });
      PricingAbout.hasMany(models.PricingAboutDropdown, { foreignKey: 'pricingAboutId', as: 'dropdowns' });
    }
  }
  PricingAbout.init({
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    heroImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    smallImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PricingAbout',
    timestamps: true
  });
  return PricingAbout;
};