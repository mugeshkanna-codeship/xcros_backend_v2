'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ProfileDashboard extends Model {
    static associate(models) {
      ProfileDashboard.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  ProfileDashboard.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    firstName: DataTypes.STRING,
    secondName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    websiteUrl: DataTypes.STRING,
    notes: DataTypes.TEXT,
    avatar: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    facebookUrl: DataTypes.STRING,
    twitterUrl: DataTypes.STRING,
    vkontakteUrl: DataTypes.STRING,
    instagramUrl: DataTypes.STRING,
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProfileDashboard',
    tableName: 'profile_dashboards',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['user_id', 'domain'] },
      { fields: ['user_id'] },
      { fields: ['domain'] }
    ]
  });
  return ProfileDashboard;
};
