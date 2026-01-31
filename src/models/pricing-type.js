'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingType extends Model {
    static associate(models) {
      PricingType.hasMany(models.PricingPackage, { foreignKey: 'pricingTypeId', as: 'packages' });
    }
  }
  PricingType.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
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
      )
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PricingType',
    tableName: 'pricing_types',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['category'] },
      { fields: ['placement'] },
      { fields: ['domain'] }
    ]
  });
  return PricingType;
};
