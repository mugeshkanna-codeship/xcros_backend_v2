'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CouponCategory extends Model {
    static associate(models) {
      CouponCategory.belongsTo(models.Coupon, { foreignKey: 'couponId', as: 'coupon' });
      CouponCategory.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    }
  }
  CouponCategory.init({
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
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'categories', key: 'id' }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'CouponCategory',
    tableName: 'coupon_categories',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['coupon_id', 'category_id'] },
      { fields: ['coupon_id'] },
      { fields: ['category_id'] }
    ]
  });
  return CouponCategory;
};
