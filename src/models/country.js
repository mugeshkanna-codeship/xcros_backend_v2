'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Country extends Model {
    static associate(models) {
      Country.hasMany(models.State, { foreignKey: 'countryId', as: 'states' });
      Country.hasMany(models.User, { foreignKey: 'countryId', as: 'users' });
    }
  }
  Country.init({
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
    iso2: DataTypes.STRING(2),
    iso3: DataTypes.STRING(3),
    phoneCode: DataTypes.STRING,
    currency: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Country',
    tableName: 'countries',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['code'] },
      { fields: ['iso2'] },
      { fields: ['is_active'] }
    ]
  });
  return Country;
};
