'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingAddress extends Model {
    static associate(models) {
      ListingAddress.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  ListingAddress.init({
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
    type: {
      type: DataTypes.ENUM('PRIMARY', 'SECONDARY', 'BILLING', 'SHIPPING', 'BRANCH'),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    streetAddress: DataTypes.STRING,
    landmark: DataTypes.STRING,
    area: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    latitude: DataTypes.DECIMAL(10, 8),
    longitude: DataTypes.DECIMAL(11, 8),
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ListingAddress',
    tableName: 'listing_addresses',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['type'] },
      { fields: ['latitude', 'longitude'] }
    ]
  });
  return ListingAddress;
};
