'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ReportListing extends Model {
    static associate(models) {
      ReportListing.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      ReportListing.belongsTo(models.User, { foreignKey: 'reportedBy', as: 'reporter' });
    }
  }
  ReportListing.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'listings', key: 'id' }
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
    modelName: 'ReportListing',
    tableName: 'report_listings',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['reported_by'] },
      { fields: ['status'] },
      { fields: ['domain'] }
    ]
  });
  return ReportListing;
};
