'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class AgentReviewLike extends Model {
    static associate(models) {
      AgentReviewLike.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      AgentReviewLike.belongsTo(models.AgentReview, { foreignKey: 'reviewId', as: 'review' });
    }
  }
  AgentReviewLike.init({
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
      references: { model: 'agent_reviews', key: 'id' }
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AgentReviewLike',
    tableName: 'agent_review_likes',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['review_id'] },
      { unique: true, fields: ['user_id', 'review_id'] }
    ]
  });
  return AgentReviewLike;
};
