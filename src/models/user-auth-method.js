'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserAuthMethod extends Model {
    static associate(models) {
      UserAuthMethod.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  UserAuthMethod.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.ENUM('PASSWORD', 'GOOGLE', 'FACEBOOK', 'APPLE', 'OTP'),
      allowNull: false
    },
    identifier: DataTypes.STRING, // email for password, external ID for oauth
    hashedPassword: DataTypes.STRING,
    salt: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    lastUsedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserAuthMethod',
    tableName: 'user_auth_methods',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['type'] },
      { fields: ['identifier'] },
      { unique: true, fields: ['user_id', 'type'] }
    ]
  });
  return UserAuthMethod;
};
