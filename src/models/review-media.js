'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ReviewMedia extends Model {
    static associate(models) {
      ReviewMedia.belongsTo(models.Review, { foreignKey: 'reviewId', as: 'review' });
      ReviewMedia.belongsTo(models.Media, { foreignKey: 'mediaId', as: 'media' });
    }
  }
  ReviewMedia.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    reviewId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'reviews', key: 'id' }
    },
    mediaId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'media', key: 'id' }
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ReviewMedia',
    tableName: 'review_media',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['review_id'] },
      { fields: ['media_id'] },
      { unique: true, fields: ['review_id', 'media_id'] }
    ]
  });
  return ReviewMedia;
};
