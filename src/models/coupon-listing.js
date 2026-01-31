'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CouponListing extends Model {
    static associate(models) {
      CouponListing.belongsTo(models.Coupon, { foreignKey: 'couponId', as: 'coupon' });
      CouponListing.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  CouponListing.init({
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
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'listings', key: 'id' }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'CouponListing',
    tableName: 'coupon_listings',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['coupon_id', 'listing_id'] },
      { fields: ['coupon_id'] },
      { fields: ['listing_id'] }
    ]
  });
  return CouponListing;
};
