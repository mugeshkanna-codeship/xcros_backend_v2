'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      Client.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country' });
      Client.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
      Client.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
      Client.belongsTo(models.Pincode, { foreignKey: 'pincodeId', as: 'pincode' });
    }
  }
  Client.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    slug: DataTypes.STRING,
    placement: DataTypes.STRING,
    uid: DataTypes.STRING,
    infoTitle: DataTypes.STRING,
    infoData: DataTypes.TEXT,
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    urlLink: DataTypes.STRING,
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['slug'] },
      { fields: ['placement'] },
      { fields: ['is_active'] },
      { fields: ['domain'] }
    ]
  });
  return Client;
};
