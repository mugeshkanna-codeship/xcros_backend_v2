'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Booking.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      Booking.belongsTo(models.Package, { foreignKey: 'packageId', as: 'package' });
      Booking.hasMany(models.BookingService, { foreignKey: 'bookingId', as: 'services' });
      Booking.hasMany(models.BookingPayment, { foreignKey: 'bookingId', as: 'payments' });
    }
  }
  Booking.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    bookingNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'listings', key: 'id' }
    },
    packageId: {
      type: DataTypes.UUID,
      references: { model: 'packages', key: 'id' }
    },
    type: {
      type: DataTypes.ENUM('SERVICE', 'PRODUCT', 'APPOINTMENT', 'EVENT', 'CONSULTATION'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REFUNDED'),
      defaultValue: 'PENDING'
    },
    
    // Booking details
    bookingDate: DataTypes.DATE,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    duration: DataTypes.INTEGER, // in minutes
    
    // Customer info
    customerName: DataTypes.STRING,
    customerEmail: DataTypes.STRING,
    customerPhone: DataTypes.STRING,
    
    // Pricing
    subtotal: DataTypes.DECIMAL(10, 2),
    tax: DataTypes.DECIMAL(10, 2),
    discount: DataTypes.DECIMAL(10, 2),
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: DataTypes.STRING(3),
    
    // Additional info
    requirements: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    adminNotes: DataTypes.TEXT,
    
    // Tracking
    confirmedAt: DataTypes.DATE,
    startedAt: DataTypes.DATE,
    completedAt: DataTypes.DATE,
    cancelledAt: DataTypes.DATE,
    cancellationReason: DataTypes.TEXT,
    
    // Payment info
    paymentStatus: {
      type: DataTypes.ENUM('PENDING', 'PARTIAL', 'PAID', 'REFUNDED', 'FAILED'),
      defaultValue: 'PENDING'
    },
    paymentMethod: DataTypes.STRING,
    
    // Metadata
    referralSource: DataTypes.STRING,
    ipAddress: DataTypes.INET,
    userAgent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings',
    underscored: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      { fields: ['booking_number'] },
      { fields: ['user_id'] },
      { fields: ['listing_id'] },
      { fields: ['status'] },
      { fields: ['type'] },
      { fields: ['booking_date'] },
      { fields: ['payment_status'] },
      { fields: ['created_at'] }
    ]
  });
  return Booking;
};
