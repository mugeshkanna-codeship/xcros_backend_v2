'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Amenity extends Model {
    static associate(models) {
      Amenity.belongsToMany(models.Listing, { 
        through: models.ListingAmenity, 
        foreignKey: 'amenityId',
        otherKey: 'listingId',
        as: 'listings'
      });
      Amenity.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      Amenity.belongsTo(models.Media, { foreignKey: 'iconId', as: 'icon' });
    }
  }
  Amenity.init({
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
    description: DataTypes.TEXT,
    categoryId: {
      type: DataTypes.UUID,
      references: { model: 'categories', key: 'id' }
    },
    iconId: {
      type: DataTypes.UUID,
      references: { model: 'media', key: 'id' }
    },
    type: {
      type: DataTypes.ENUM('BASIC', 'PREMIUM', 'LUXURY'),
      defaultValue: 'BASIC'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Amenity',
    tableName: 'amenities',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['slug'] },
      { fields: ['category_id'] },
      { fields: ['type'] },
      { fields: ['is_active'] }
    ]
  });
  return Amenity;
};
