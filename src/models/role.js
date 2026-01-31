'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.UserRole, { foreignKey: 'roleId', as: 'userRoles' });
    }
  }
  Role.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    displayName: DataTypes.STRING,
    description: DataTypes.TEXT,
    permissions: DataTypes.JSONB, // Only exception for permissions structure
    isSystem: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['is_active'] }
    ]
  });
  return Role;
};
