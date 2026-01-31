'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Sponsor extends Model {
    static associate(models) {
      Sponsor.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country' });
      Sponsor.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
      Sponsor.belongsTo(models.Pincode, { foreignKey: 'pincodeId', as: 'pincode' });
      Sponsor.hasMany(models.SponsorContact, { foreignKey: 'sponsorId', as: 'contacts' });
    }
  }
  Sponsor.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logo: DataTypes.STRING,
    description: DataTypes.TEXT,
    placement: {
      type: DataTypes.ENUM('Local Sponsor', 'Global Sponsor', 'Site Landing', 'Location Guide', 'Directory'),
      allowNull: false
    },
    domain: DataTypes.STRING,
    title: DataTypes.STRING,
    urlLink: DataTypes.STRING,
    from: DataTypes.DATE,
    to: DataTypes.DATE,
    countryId: {
      type: DataTypes.UUID,
      references: { model: 'countries', key: 'id' }
    },
    cityId: {
      type: DataTypes.UUID,
      references: { model: 'cities', key: 'id' }
    },
    pincodeId: {
      type: DataTypes.UUID,
      references: { model: 'pincodes', key: 'id' }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Sponsor',
    tableName: 'sponsors',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['placement'] },
      { fields: ['domain'] },
      { fields: ['is_active'] },
      { fields: ['country_id'] },
      { fields: ['city_id'] }
    ]
  });
  return Sponsor;
};
