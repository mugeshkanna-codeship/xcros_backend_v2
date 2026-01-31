'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Pincode extends Model {
    static associate(models) {
      Pincode.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
      Pincode.hasMany(models.User, { foreignKey: 'pincodeId', as: 'users' });
    }
  }
  Pincode.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area: DataTypes.STRING,
    district: DataTypes.STRING,
    cityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'id'
      }
    },
    latitude: DataTypes.DECIMAL(10, 8),
    longitude: DataTypes.DECIMAL(11, 8),
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Pincode',
    tableName: 'pincodes',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['city_id'] },
      { fields: ['code'] },
      { fields: ['area'] },
      { fields: ['latitude', 'longitude'] },
      { fields: ['is_active'] }
    ]
  });
  return Pincode;
};
