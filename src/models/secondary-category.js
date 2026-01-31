'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SecondaryCategory extends Model {
    static associate(models) {
      SecondaryCategory.belongsTo(models.PrimaryCategory, { foreignKey: 'primaryCategoryId', as: 'primaryCategory' });
      SecondaryCategory.hasMany(models.TertiaryCategory, { foreignKey: 'secondaryCategoryId', as: 'tertiaryCategories' });
    }
  }
  SecondaryCategory.init({
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
    primaryCategoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'primary_categories',
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
    modelName: 'SecondaryCategory',
    tableName: 'secondary_categories',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['primary_category_id'] },
      { fields: ['name'] },
      { fields: ['slug'] },
      { fields: ['is_active'] },
      { fields: ['sort_order'] }
    ]
  });
  return SecondaryCategory;
};
