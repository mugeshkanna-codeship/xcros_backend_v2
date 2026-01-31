'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class FaqListing extends Model {
    static associate(models) {
      FaqListing.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      FaqListing.hasMany(models.FaqListingContent, { foreignKey: 'faqListingId', as: 'contents' });
    }
  }
  FaqListing.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    domain: DataTypes.STRING,
    listingId: {
      type: DataTypes.UUID,
      references: { model: 'listings', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'FaqListing',
    tableName: 'faq_listings',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['domain'] }
    ]
  });
  return FaqListing;
};
