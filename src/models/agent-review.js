'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class AgentReview extends Model {
    static associate(models) {
      AgentReview.belongsTo(models.User, { foreignKey: 'userId', as: 'reviewer' });
      AgentReview.belongsTo(models.User, { foreignKey: 'agentId', as: 'agent' });
      AgentReview.hasMany(models.AgentReviewLike, { foreignKey: 'reviewId', as: 'reviewLikes' });
    }
  }
  AgentReview.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    agentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    images: DataTypes.JSONB,
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AgentReview',
    tableName: 'agent_reviews',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['agent_id'] },
      { fields: ['rating'] },
      { fields: ['domain'] },
      { fields: ['created_at'] }
    ]
  });
  return AgentReview;
};
