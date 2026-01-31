'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CityInfo extends Model {
    static associate(models) {
      CityInfo.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country' });
      CityInfo.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
      CityInfo.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
    }
  }
  CityInfo.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    domain: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending Approval'
    },
    countryId: {
      type: DataTypes.UUID,
      references: { model: 'countries', key: 'id' }
    },
    stateId: {
      type: DataTypes.UUID,
      references: { model: 'states', key: 'id' }
    },
    cityId: {
      type: DataTypes.UUID,
      references: { model: 'cities', key: 'id' }
    },
    banner: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    locationVideo: DataTypes.STRING,
    aboutLocation: DataTypes.TEXT,
    almanacPopulation: DataTypes.STRING,
    almanacPopulationDensity: DataTypes.STRING,
    countryCapital: DataTypes.STRING,
    stateCapital: DataTypes.STRING,
    almanacArea: DataTypes.STRING,
    almanacFormation: DataTypes.STRING,
    factIncorporated: DataTypes.STRING,
    factLanguage: DataTypes.STRING,
    factWebsite: DataTypes.STRING,
    funFacts: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    gallery: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    locationDetailsHouseholds: DataTypes.STRING,
    locationDetailsMedian: DataTypes.STRING,
    locationDetailsCountrySize: DataTypes.STRING,
    stills: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    motions: {
      type: DataTypes.JSONB,
      defaultValue: []
    }
  }, {
    sequelize,
    modelName: 'CityInfo',
    tableName: 'city_infos',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['city_id'] },
      { fields: ['state_id'] },
      { fields: ['country_id'] },
      { fields: ['domain'] },
      { fields: ['status'] }
    ]
  });
  return CityInfo;
};
