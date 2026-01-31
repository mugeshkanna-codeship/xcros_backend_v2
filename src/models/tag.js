'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Category, { 
        through: models.CategoryTag, 
        foreignKey: 'tagId',
        otherKey: 'categoryId',
        as: 'categories'
      });
      Tag.belongsToMany(models.Listing, { 
        through: models.ListingTag, 
        foreignKey: 'tagId',
        otherKey: 'listingId',
        as: 'listings'
      });
    }
  }
  Tag.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    type: {
      type: DataTypes.ENUM('BRAND', 'LOCATION', 'PRODUCT', 'SERVICE', 'AMENITY', 'GENERAL'),
      defaultValue: 'GENERAL'
    },
    description: DataTypes.TEXT,
    color: DataTypes.STRING(7), // Hex color
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['slug'] },
      { fields: ['type'] },
      { fields: ['is_active'] }
    ]
  });
  return Tag;
};
