'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PincodeInfo extends Model {
    static associate(models) {
      PincodeInfo.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country' });
      PincodeInfo.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
      PincodeInfo.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
      PincodeInfo.belongsTo(models.Pincode, { foreignKey: 'pincodeId', as: 'pincode' });
    }
  }
  PincodeInfo.init({
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
    pincodeId: {
      type: DataTypes.UUID,
      references: { model: 'pincodes', key: 'id' }
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
    modelName: 'PincodeInfo',
    tableName: 'pincode_infos',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['pincode_id'] },
      { fields: ['city_id'] },
      { fields: ['state_id'] },
      { fields: ['country_id'] },
      { fields: ['domain'] },
      { fields: ['status'] }
    ]
  });
  return PincodeInfo;
};
