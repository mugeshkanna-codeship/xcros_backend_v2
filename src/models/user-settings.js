'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserSettings extends Model {
    static associate(models) {
      UserSettings.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  UserSettings.init({
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
    privacy: DataTypes.ENUM('PUBLIC', 'PRIVATE', 'FRIENDS'),
    visibility: DataTypes.ENUM('VISIBLE', 'HIDDEN'),
    showInCity: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    addressUpdated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    emailNotifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    smsNotifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    marketingEmails: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    twoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'UserSettings',
    tableName: 'user_settings',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] }
    ]
  });
  return UserSettings;
};
