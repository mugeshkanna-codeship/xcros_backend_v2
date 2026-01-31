'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      Blog.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
      Blog.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      Blog.belongsTo(models.Media, { foreignKey: 'featuredImageId', as: 'featuredImage' });
      Blog.belongsToMany(models.Tag, { 
        through: models.BlogTag, 
        foreignKey: 'blogId',
        otherKey: 'tagId',
        as: 'tags'
      });
    }
  }
  Blog.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    excerpt: DataTypes.TEXT,
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    
    // SEO fields
    metaTitle: DataTypes.STRING,
    metaDescription: DataTypes.TEXT,
    metaKeywords: DataTypes.STRING,
    
    // Author and category
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    categoryId: {
      type: DataTypes.UUID,
      references: { model: 'categories', key: 'id' }
    },
    
    // Media
    featuredImageId: {
      type: DataTypes.UUID,
      references: { model: 'media', key: 'id' }
    },
    
    // Publishing
    status: {
      type: DataTypes.ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED'),
      defaultValue: 'DRAFT'
    },
    publishedAt: DataTypes.DATE,
    scheduledFor: DataTypes.DATE,
    
    // Engagement
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    commentCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    shareCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    
    // Settings
    allowComments: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isSticky: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    // Content settings
    readingTime: DataTypes.INTEGER, // in minutes
    language: DataTypes.STRING(5),
    
    // Internal
    editorNotes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
    underscored: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      { fields: ['slug'] },
      { fields: ['author_id'] },
      { fields: ['category_id'] },
      { fields: ['status'] },
      { fields: ['published_at'] },
      { fields: ['is_featured'] },
      { fields: ['view_count'] },
      { fields: ['status', 'published_at'] }
    ]
  });
  return Blog;
};
