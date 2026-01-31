'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingTimeline extends Model {
    static associate(models) {
      ListingTimeline.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      ListingTimeline.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
    }
  }
  ListingTimeline.init({
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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    eventDate: DataTypes.DATE,
    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    imageId: {
      type: DataTypes.UUID,
      references: { model: 'media', key: 'id' }
    },
    category: {
      type: DataTypes.ENUM('MILESTONE', 'ACHIEVEMENT', 'LAUNCH', 'EXPANSION', 'AWARD', 'OTHER'),
      defaultValue: 'OTHER'
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
    modelName: 'ListingTimeline',
    tableName: 'listing_timelines',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['event_date'] },
      { fields: ['year'] },
      { fields: ['category'] },
      { fields: ['sort_order'] }
    ]
  });
  return ListingTimeline;
};
