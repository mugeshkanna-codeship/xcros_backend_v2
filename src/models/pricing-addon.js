'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingAddon extends Model {
    static associate(models) {
      // PricingAddons are organized by placement categories
    }
  }
  PricingAddon.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    placement: {
      type: DataTypes.ENUM(
        'Listing Profile',
        'Online store',
        'Hyperlocal Delivery',
        'Influencer marketing',
        'Sales & Marketing',
        'Advertise with us',
        'Be our member',
        'Network agency',
        'Social investor',
        'Delivery partner',
        'Marketing Agent',
        'Influencer',
        'Affiliate'
      ),
      allowNull: false
    },
    categories: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of categories, each with name and addons array (name, price, description, images, logo)'
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PricingAddon',
    tableName: 'pricing_addons',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['placement'] },
      { fields: ['domain'] }
    ]
  });
  return PricingAddon;
};
