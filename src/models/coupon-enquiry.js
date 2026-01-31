'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CouponEnquiry extends Model {
    static associate(models) {
      CouponEnquiry.belongsTo(models.Coupon, { foreignKey: 'couponId', as: 'coupon' });
      CouponEnquiry.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  CouponEnquiry.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    couponId: {
      type: DataTypes.UUID,
      references: { model: 'coupons', key: 'id' }
    },
    userId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    message: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('Pending', 'Contacted', 'Resolved'),
      defaultValue: 'Pending'
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CouponEnquiry',
    tableName: 'coupon_enquiries',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['coupon_id'] },
      { fields: ['user_id'] },
      { fields: ['email'] },
      { fields: ['status'] },
      { fields: ['domain'] }
    ]
  });
  return CouponEnquiry;
};
