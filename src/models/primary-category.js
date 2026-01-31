'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PrimaryCategory extends Model {
    static associate(models) {
      PrimaryCategory.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      PrimaryCategory.hasMany(models.SecondaryCategory, { foreignKey: 'primaryCategoryId', as: 'secondaryCategories' });
    }
  }
  PrimaryCategory.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    icon: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    sortOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PrimaryCategory',
    tableName: 'primary_categories',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['category_id'] },
      { fields: ['name'] },
      { fields: ['slug'] },
      { fields: ['is_active'] },
      { fields: ['sort_order'] }
    ]
  });
  return PrimaryCategory;
};
