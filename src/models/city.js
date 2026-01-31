'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
      City.hasMany(models.Pincode, { foreignKey: 'cityId', as: 'pincodes' });
      City.hasMany(models.User, { foreignKey: 'cityId', as: 'users' });
    }
  }
  City.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: DataTypes.STRING,
    stateId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'states',
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
    modelName: 'City',
    tableName: 'cities',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['state_id'] },
      { fields: ['name'] },
      { fields: ['code'] },
      { fields: ['latitude', 'longitude'] },
      { fields: ['is_active'] }
    ]
  });
  return City;
};
