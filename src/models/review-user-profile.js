'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ReviewUserProfile extends Model {
    static associate(models) {
      ReviewUserProfile.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  ReviewUserProfile.init({
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
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    bio: DataTypes.TEXT,
    location: DataTypes.STRING,
    reviewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReviewUserProfile',
    tableName: 'review_user_profiles',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['user_id'] },
      { fields: ['domain'] }
    ]
  });
  return ReviewUserProfile;
};
