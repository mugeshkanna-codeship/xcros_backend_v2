'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class TertiaryCategory extends Model {
    static associate(models) {
      TertiaryCategory.belongsTo(models.SecondaryCategory, { foreignKey: 'secondaryCategoryId', as: 'secondaryCategory' });
    }
  }
  TertiaryCategory.init({
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
    secondaryCategoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'secondary_categories',
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
    modelName: 'TertiaryCategory',
    tableName: 'tertiary_categories',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['secondary_category_id'] },
      { fields: ['name'] },
      { fields: ['slug'] },
      { fields: ['is_active'] },
      { fields: ['sort_order'] }
    ]
  });
  return TertiaryCategory;
};
