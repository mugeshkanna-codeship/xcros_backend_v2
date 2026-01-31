'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class DealOfTheDay extends Model {
    static associate(models) {
      DealOfTheDay.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
      DealOfTheDay.belongsTo(models.Pincode, { foreignKey: 'pincodeId', as: 'pincode' });
      DealOfTheDay.belongsTo(models.Listing, { foreignKey: 'storeId', as: 'store' });
    }
  }
  DealOfTheDay.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false
    },
    locationType: {
      type: DataTypes.ENUM('City', 'Pincode'),
      allowNull: false
    },
    cityId: {
      type: DataTypes.UUID,
      references: { model: 'cities', key: 'id' }
    },
    pincodeId: {
      type: DataTypes.UUID,
      references: { model: 'pincodes', key: 'id' }
    },
    storeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'listings', key: 'id' }
    },
    productId: DataTypes.STRING,
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'DealOfTheDay',
    tableName: 'deal_of_the_days',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['domain'] },
      { fields: ['location_type'] },
      { fields: ['city_id'] },
      { fields: ['pincode_id'] },
      { fields: ['store_id'] },
      { fields: ['start_date', 'end_date'] },
      { fields: ['is_active'] }
    ]
  });
  return DealOfTheDay;
};
