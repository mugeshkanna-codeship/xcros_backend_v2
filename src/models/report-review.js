'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ReportReview extends Model {
    static associate(models) {
      ReportReview.belongsTo(models.Review, { foreignKey: 'reviewId', as: 'review' });
      ReportReview.belongsTo(models.User, { foreignKey: 'reportedBy', as: 'reporter' });
    }
  }
  ReportReview.init({
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
    reportedBy: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('Pending', 'Reviewed', 'Resolved', 'Dismissed'),
      defaultValue: 'Pending'
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReportReview',
    tableName: 'report_reviews',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['review_id'] },
      { fields: ['reported_by'] },
      { fields: ['status'] },
      { fields: ['domain'] }
    ]
  });
  return ReportReview;
};
