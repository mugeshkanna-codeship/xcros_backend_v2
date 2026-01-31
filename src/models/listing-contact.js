'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingContact extends Model {
    static associate(models) {
      ListingContact.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  ListingContact.init({
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
      type: DataTypes.ENUM('PHONE', 'EMAIL', 'WEBSITE', 'TOLL_FREE', 'WHATSAPP', 'TELEGRAM'),
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    label: DataTypes.STRING,
    isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ListingContact',
    tableName: 'listing_contacts',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['type'] },
      { fields: ['value'] }
    ]
  });
  return ListingContact;
};
