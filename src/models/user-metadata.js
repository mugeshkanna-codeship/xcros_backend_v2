'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserMetadata extends Model {
    static associate(models) {
      UserMetadata.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      UserMetadata.belongsTo(models.Package, { foreignKey: 'packageId', as: 'package' });
    }
  }
  UserMetadata.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    packageName: DataTypes.STRING,
    packageId: {
      type: DataTypes.UUID,
      references: {
        model: 'packages',
        key: 'id'
      }
    },
    packageStartDate: DataTypes.DATE,
    packageExpiryDate: DataTypes.DATE,
    packageValidity: DataTypes.INTEGER,
    joinedDate: DataTypes.DATE,
    lastOtp: DataTypes.INTEGER,
    otpExpiresAt: DataTypes.DATE,
    ipAddress: DataTypes.INET,
    userAgent: DataTypes.TEXT,
    referralCode: DataTypes.STRING,
    referredBy: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    totalReferrals: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'UserMetadata',
    tableName: 'user_metadata',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['package_id'] },
      { fields: ['referral_code'] },
      { fields: ['referred_by'] }
    ]
  });
  return UserMetadata;
};
