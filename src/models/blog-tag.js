'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class BlogTag extends Model {
    static associate(models) {
      BlogTag.belongsTo(models.Blog, { foreignKey: 'blogId', as: 'blog' });
      BlogTag.belongsTo(models.Tag, { foreignKey: 'tagId', as: 'tag' });
    }
  }
  BlogTag.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    blogId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'blogs', key: 'id' }
    },
    tagId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'tags', key: 'id' }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'BlogTag',
    tableName: 'blog_tags',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['blog_id', 'tag_id'] },
      { fields: ['blog_id'] },
      { fields: ['tag_id'] }
    ]
  });
  return BlogTag;
};
