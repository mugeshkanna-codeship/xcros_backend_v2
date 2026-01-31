'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class FaqListingContent extends Model {
    static associate(models) {
      FaqListingContent.belongsTo(models.FaqListing, { foreignKey: 'faqListingId', as: 'faqListing' });
    }
  }
  FaqListingContent.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    faqListingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'faq_listings', key: 'id' }
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FaqListingContent',
    tableName: 'faq_listing_contents',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['faq_listing_id'] },
      { fields: ['domain'] }
    ]
  });
  return FaqListingContent;
};
