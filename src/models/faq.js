'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Faq extends Model {
    static associate(models) {
      Faq.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      Faq.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      Faq.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
    }
  }
  Faq.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    
    // Classification
    type: {
      type: DataTypes.ENUM('GENERAL', 'CATEGORY_SPECIFIC', 'LISTING_SPECIFIC'),
      defaultValue: 'GENERAL'
    },
    
    categoryId: {
      type: DataTypes.UUID,
      references: { model: 'categories', key: 'id' }
    },
    
    listingId: {
      type: DataTypes.UUID,
      references: { model: 'listings', key: 'id' }
    },
    
    // Organization
    section: DataTypes.STRING, // General, Pricing, Account, etc.
    tags: DataTypes.ARRAY(DataTypes.STRING),
    
    // Display
    status: {
      type: DataTypes.ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED'),
      defaultValue: 'DRAFT'
    },
    
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    
    // Engagement
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    helpfulCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    notHelpfulCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    
    // Metadata
    createdBy: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    
    lastUpdatedBy: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    
    keywords: DataTypes.ARRAY(DataTypes.STRING), // for search
    language: DataTypes.STRING(5)
  }, {
    sequelize,
    modelName: 'Faq',
    tableName: 'faqs',
    underscored: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      { fields: ['type'] },
      { fields: ['category_id'] },
      { fields: ['listing_id'] },
      { fields: ['status'] },
      { fields: ['section'] },
      { fields: ['sort_order'] },
      { fields: ['created_by'] },
      {
        name: 'faq_search_idx',
        using: 'gin',
        fields: [sequelize.literal('to_tsvector(\'english\', question || \' \' || answer)')]
      }
    ]
  });
  return Faq;
};
