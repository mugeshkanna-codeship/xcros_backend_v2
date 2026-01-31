'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CouponUsage extends Model {
    static associate(models) {
      CouponUsage.belongsTo(models.Coupon, { foreignKey: 'couponId', as: 'coupon' });
      CouponUsage.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      CouponUsage.belongsTo(models.Booking, { foreignKey: 'bookingId', as: 'booking' });
    }
  }
  CouponUsage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    couponId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'coupons', key: 'id' }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    bookingId: {
      type: DataTypes.UUID,
      references: { model: 'bookings', key: 'id' }
    },
    
    discountAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    originalAmount: DataTypes.DECIMAL(10, 2),
    finalAmount: DataTypes.DECIMAL(10, 2),
    
    status: {
      type: DataTypes.ENUM('APPLIED', 'REFUNDED'),
      defaultValue: 'APPLIED'
    },
    
    usedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    refundedAt: DataTypes.DATE,
    
    ipAddress: DataTypes.INET,
    userAgent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CouponUsage',
    tableName: 'coupon_usages',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['coupon_id'] },
      { fields: ['user_id'] },
      { fields: ['booking_id'] },
      { fields: ['used_at'] },
      { fields: ['status'] }
    ]
  });
  return CouponUsage;
};
