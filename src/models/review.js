'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Review.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      Review.belongsTo(models.Review, { foreignKey: 'parentId', as: 'parent' });
      Review.hasMany(models.Review, { foreignKey: 'parentId', as: 'replies' });
      Review.hasMany(models.ReviewLike, { foreignKey: 'reviewId', as: 'likes' });
      Review.hasMany(models.ReviewMedia, { foreignKey: 'reviewId', as: 'media' });
    }
  }
  Review.init({
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
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'listings', key: 'id' }
    },
    parentId: {
      type: DataTypes.UUID,
      references: { model: 'reviews', key: 'id' }
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    title: DataTypes.STRING,
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED', 'HIDDEN'),
      defaultValue: 'PENDING'
    },
    isVerifiedPurchase: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isAnonymous: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dislikeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    replyCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    helpfulCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    reportCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    moderatorNotes: DataTypes.TEXT,
    ipAddress: DataTypes.INET,
    userAgent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    underscored: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['listing_id'] },
      { fields: ['parent_id'] },
      { fields: ['rating'] },
      { fields: ['status'] },
      { fields: ['created_at'] },
      { fields: ['listing_id', 'rating'] },
      { fields: ['listing_id', 'status'] }
    ]
  });
  return Review;
};
