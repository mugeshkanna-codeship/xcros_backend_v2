'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      UserRole.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      UserRole.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
    }
  }
  UserRole.init({
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
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    assignedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    assignedBy: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['role_id'] },
      { fields: ['is_active'] },
      { unique: true, fields: ['user_id', 'role_id'] }
    ]
  });
  return UserRole;
};
