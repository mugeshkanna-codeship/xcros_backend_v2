'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingShift extends Model {
    static associate(models) {
      ListingShift.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  ListingShift.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'listings', key: 'id' }
    },
    dayOfWeek: {
      type: DataTypes.ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'),
      allowNull: false
    },
    shiftNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 1, max: 3 }
    },
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    isClosed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ListingShift',
    tableName: 'listing_shifts',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['day_of_week'] },
      { unique: true, fields: ['listing_id', 'day_of_week', 'shift_number'] }
    ]
  });
  return ListingShift;
};
