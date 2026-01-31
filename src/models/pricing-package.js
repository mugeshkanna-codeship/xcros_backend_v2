'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingPackage extends Model {
    static associate(models) {
      PricingPackage.belongsTo(models.PricingType, { foreignKey: 'pricingTypeId', as: 'pricingType' });
    }
  }
  PricingPackage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pricingTypeId: {
      type: DataTypes.UUID,
      references: { model: 'pricing_types', key: 'id' }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    duration: DataTypes.STRING,
    features: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    description: DataTypes.TEXT,
    isPopular: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PricingPackage',
    tableName: 'pricing_packages',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['pricing_type_id'] },
      { fields: ['name'] },
      { fields: ['domain'] }
    ]
  });
  return PricingPackage;
};
