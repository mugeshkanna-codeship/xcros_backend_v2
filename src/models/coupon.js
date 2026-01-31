'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Coupon extends Model {
    static associate(models) {
      Coupon.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
      Coupon.belongsToMany(models.Listing, { 
        through: models.CouponListing, 
        foreignKey: 'couponId',
        otherKey: 'listingId',
        as: 'applicableListings'
      });
      Coupon.belongsToMany(models.Category, { 
        through: models.CouponCategory, 
        foreignKey: 'couponId',
        otherKey: 'categoryId',
        as: 'applicableCategories'
      });
      Coupon.hasMany(models.CouponUsage, { foreignKey: 'couponId', as: 'usages' });
    }
  }
  Coupon.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    
    type: {
      type: DataTypes.ENUM('PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING', 'BUY_X_GET_Y'),
      allowNull: false
    },
    
    // Discount values
    discountValue: DataTypes.DECIMAL(10, 2),
    maxDiscountAmount: DataTypes.DECIMAL(10, 2),
    minOrderAmount: DataTypes.DECIMAL(10, 2),
    
    // Usage limits
    usageLimit: DataTypes.INTEGER,
    usagePerUser: DataTypes.INTEGER,
    usedCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    
    // Validity
    validFrom: DataTypes.DATE,
    validUntil: DataTypes.DATE,
    
    // Applicability
    applicableTo: {
      type: DataTypes.ENUM('ALL', 'SPECIFIC_LISTINGS', 'SPECIFIC_CATEGORIES', 'FIRST_TIME_USERS', 'REFERRALS'),
      defaultValue: 'ALL'
    },
    
    status: {
      type: DataTypes.ENUM('DRAFT', 'ACTIVE', 'EXPIRED', 'DISABLED'),
      defaultValue: 'DRAFT'
    },
    
    isStackable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    // Creator
    createdBy: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    
    // Metadata
    termsConditions: DataTypes.TEXT,
    internalNotes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Coupon',
    tableName: 'coupons',
    underscored: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      { fields: ['code'] },
      { fields: ['status'] },
      { fields: ['type'] },
      { fields: ['valid_from', 'valid_until'] },
      { fields: ['created_by'] }
    ]
  });
  return Coupon;
};
