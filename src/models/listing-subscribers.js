'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingSubscribers extends Model {
    static associate(models) {
      ListingSubscribers.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  ListingSubscribers.init({
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
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    domain: DataTypes.STRING,
    subscribedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'ListingSubscribers',
    tableName: 'listing_subscribers',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['email'] },
      { unique: true, fields: ['listing_id', 'email'] },
      { fields: ['domain'] }
    ]
  });
  return ListingSubscribers;
};
