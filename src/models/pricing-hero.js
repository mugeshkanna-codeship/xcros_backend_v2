'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingHero extends Model {
    static associate(models) {
      PricingHero.belongsTo(models.Pricing, { foreignKey: 'pricingId', as: 'pricing' });
    }
  }
  PricingHero.init({
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
    greyHeading: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subHeading: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PricingHero',
    timestamps: true
  });
  return PricingHero;
};