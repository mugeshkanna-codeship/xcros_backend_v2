'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Package extends Model {
    static associate(models) {
      Package.hasMany(models.UserMetadata, { foreignKey: 'packageId', as: 'userMetadata' });
    }
  }
  Package.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    type: DataTypes.ENUM('FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE'),
    price: DataTypes.DECIMAL(10, 2),
    currency: DataTypes.STRING(3),
    validityDays: DataTypes.INTEGER,
    features: DataTypes.JSONB,
    limits: DataTypes.JSONB,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    sortOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Package',
    tableName: 'packages',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['type'] },
      { fields: ['is_active'] },
      { fields: ['sort_order'] }
    ]
  });
  return Package;
};
