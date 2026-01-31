'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ReviewLike extends Model {
    static associate(models) {
      ReviewLike.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      ReviewLike.belongsTo(models.Review, { foreignKey: 'reviewId', as: 'review' });
    }
  }
  ReviewLike.init({
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
    reviewId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'reviews', key: 'id' }
    },
    type: {
      type: DataTypes.ENUM('LIKE', 'DISLIKE', 'HELPFUL', 'REPORT'),
      allowNull: false
    },
    reason: DataTypes.STRING, // for reports
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ReviewLike',
    tableName: 'review_likes',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['user_id', 'review_id', 'type'] },
      { fields: ['user_id'] },
      { fields: ['review_id'] },
      { fields: ['type'] }
    ]
  });
  return ReviewLike;
};
