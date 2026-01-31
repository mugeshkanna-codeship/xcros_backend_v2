'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CategoryTag extends Model {
    static associate(models) {
      CategoryTag.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      CategoryTag.belongsTo(models.Tag, { foreignKey: 'tagId', as: 'tag' });
    }
  }
  CategoryTag.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tags',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'CategoryTag',
    tableName: 'category_tags',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['category_id', 'tag_id'] },
      { fields: ['category_id'] },
      { fields: ['tag_id'] }
    ]
  });
  return CategoryTag;
};
