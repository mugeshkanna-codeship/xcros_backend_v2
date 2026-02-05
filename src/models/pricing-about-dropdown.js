'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingAboutDropdown extends Model {
    static associate(models) {
      PricingAboutDropdown.belongsTo(models.PricingAbout, { foreignKey: 'pricingAboutId', as: 'about' });
    }
  }
  PricingAboutDropdown.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pricingAboutId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'PricingAbouts',
        key: 'id'
      }
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('about_us', 'why_choose_us', 'how_we_work', 'about_vendor', 'other'),
      defaultValue: 'other',
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PricingAboutDropdown',
    timestamps: true
  });
  return PricingAboutDropdown;
};