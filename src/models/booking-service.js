'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class BookingService extends Model {
    static associate(models) {
      BookingService.belongsTo(models.Booking, { foreignKey: 'bookingId', as: 'booking' });
    }
  }
  BookingService.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    bookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'bookings', key: 'id' }
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serviceDescription: DataTypes.TEXT,
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    unitPrice: DataTypes.DECIMAL(10, 2),
    totalPrice: DataTypes.DECIMAL(10, 2),
    currency: DataTypes.STRING(3),
    duration: DataTypes.INTEGER, // in minutes
    notes: DataTypes.TEXT,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'BookingService',
    tableName: 'booking_services',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['booking_id'] },
      { fields: ['service_name'] }
    ]
  });
  return BookingService;
};
