'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class LocationLaunch extends Model {
    static associate(models) {
      LocationLaunch.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
      LocationLaunch.belongsTo(models.Pincode, { foreignKey: 'pincodeId', as: 'pincode' });
    }
  }
  LocationLaunch.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    domain: DataTypes.STRING,
    cityId: {
      type: DataTypes.UUID,
      references: { model: 'cities', key: 'id' }
    },
    pincodeId: {
      type: DataTypes.UUID,
      references: { model: 'pincodes', key: 'id' }
    },
    sliderImages: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    launchDate: DataTypes.STRING,
    launchTime: DataTypes.STRING,
    offerImages: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of offer images with company details: image, companyName, companyNumber, companyEmail'
    },
    sponsors: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'Sponsors object with big and small arrays containing image, companyName, companyNumber, companyEmail'
    },
    popupImage: DataTypes.STRING,
    popupImageCompanyName: DataTypes.STRING,
    popupImageCompanyNumber: DataTypes.STRING,
    popupImageCompanyEmail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LocationLaunch',
    tableName: 'location_launches',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['city_id'] },
      { fields: ['pincode_id'] },
      { fields: ['domain'] },
      { fields: ['launch_date'] }
    ]
  });
  return LocationLaunch;
};
