'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserProfile, { foreignKey: 'userId', as: 'profile' });
      User.hasOne(models.UserSettings, { foreignKey: 'userId', as: 'settings' });
      User.hasMany(models.UserRole, { foreignKey: 'userId', as: 'roles' });
      User.hasMany(models.UserAuthMethod, { foreignKey: 'userId', as: 'authMethods' });
      User.hasOne(models.UserMetadata, { foreignKey: 'userId', as: 'metadata' });
      User.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country' });
      User.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
      User.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
      User.belongsTo(models.Pincode, { foreignKey: 'pincodeId', as: 'pincode' });
      User.belongsTo(models.User, { foreignKey: 'agentId', as: 'agent' });
      User.hasMany(models.User, { foreignKey: 'agentId', as: 'clients' });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    domain: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'PENDING_APPROVAL', 'SUSPENDED'),
      defaultValue: 'PENDING_APPROVAL'
    },
    countryId: {
      type: DataTypes.UUID,
      references: {
        model: 'countries',
        key: 'id'
      }
    },
    stateId: {
      type: DataTypes.UUID,
      references: {
        model: 'states',
        key: 'id'
      }
    },
    cityId: {
      type: DataTypes.UUID,
      references: {
        model: 'cities',
        key: 'id'
      }
    },
    pincodeId: {
      type: DataTypes.UUID,
      references: {
        model: 'pincodes',
        key: 'id'
      }
    },
    agentId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    emailVerifiedAt: DataTypes.DATE,
    mobileVerifiedAt: DataTypes.DATE,
    lastLoginAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      { fields: ['email'] },
      { fields: ['mobile'] },
      { fields: ['status'] },
      { fields: ['domain'] },
      { fields: ['agent_id'] }
    ]
  });
  return User;
};
