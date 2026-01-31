'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.PrimaryCategory, { foreignKey: 'categoryId', as: 'primaryCategories' });
      Category.belongsToMany(models.Tag, { 
        through: models.CategoryTag, 
        foreignKey: 'categoryId',
        otherKey: 'tagId',
        as: 'tags'
      });
    }
  }
  Category.init({
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
    domain: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    sortOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['slug'] },
      { fields: ['domain'] },
      { fields: ['is_active'] },
      { fields: ['sort_order'] }
    ]
  });
  return Category;
};
