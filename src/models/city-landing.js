'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CityLanding extends Model {
    static associate(models) {
      CityLanding.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country' });
      CityLanding.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
      CityLanding.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
    }
  }
  CityLanding.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    domain: DataTypes.STRING,
    listingViewCounter: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    latitude: DataTypes.DECIMAL(10, 8),
    longitude: DataTypes.DECIMAL(11, 8),
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
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      defaultValue: 'Regular'
    },
    tags: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    description: DataTypes.TEXT,
    active: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    uid: DataTypes.STRING,
    contactAddress: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    contactMail: DataTypes.STRING,
    contactPhone: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    contactTollNo: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    contactWebsite: DataTypes.STRING,
    agentHostedPlaces: DataTypes.STRING,
    agentName: DataTypes.STRING,
    agentProfilePicture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CityLanding',
    tableName: 'city_landings',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['slug'] },
      { fields: ['city_id'] },
      { fields: ['state_id'] },
      { fields: ['country_id'] },
      { fields: ['domain'] },
      { fields: ['type'] }
    ]
  });
  return CityLanding;
};
