'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class BookingPayment extends Model {
    static associate(models) {
      BookingPayment.belongsTo(models.Booking, { foreignKey: 'bookingId', as: 'booking' });
    }
  }
  BookingPayment.init({
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
    transactionId: DataTypes.STRING,
    gatewayTransactionId: DataTypes.STRING,
    paymentGateway: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: DataTypes.STRING(3),
    
    status: {
      type: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'REFUNDED'),
      defaultValue: 'PENDING'
    },
    
    type: {
      type: DataTypes.ENUM('PAYMENT', 'REFUND', 'PARTIAL_REFUND'),
      defaultValue: 'PAYMENT'
    },
    
    gatewayResponse: DataTypes.JSONB,
    failureReason: DataTypes.STRING,
    refundReason: DataTypes.STRING,
    
    processedAt: DataTypes.DATE,
    refundedAt: DataTypes.DATE,
    
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'BookingPayment',
    tableName: 'booking_payments',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['booking_id'] },
      { fields: ['transaction_id'] },
      { fields: ['gateway_transaction_id'] },
      { fields: ['status'] },
      { fields: ['type'] },
      { fields: ['payment_gateway'] }
    ]
  });
  return BookingPayment;
};
