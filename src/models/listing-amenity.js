'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingAmenity extends Model {
    static associate(models) {
      ListingAmenity.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      ListingAmenity.belongsTo(models.Amenity, { foreignKey: 'amenityId', as: 'amenity' });
    }
  }
  ListingAmenity.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'listings', key: 'id' }
    },
    amenityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'amenities', key: 'id' }
    },
    notes: DataTypes.TEXT,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ListingAmenity',
    tableName: 'listing_amenities',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['listing_id', 'amenity_id'] },
      { fields: ['listing_id'] },
      { fields: ['amenity_id'] }
    ]
  });
  return ListingAmenity;
};
