'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class State extends Model {
    static associate(models) {
      State.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country' });
      State.hasMany(models.City, { foreignKey: 'stateId', as: 'cities' });
      State.hasMany(models.User, { foreignKey: 'stateId', as: 'users' });
    }
  }
  State.init({
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
    countryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'countries',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'State',
    tableName: 'states',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['country_id'] },
      { fields: ['name'] },
      { fields: ['code'] },
      { fields: ['is_active'] }
    ]
  });
  return State;
};
