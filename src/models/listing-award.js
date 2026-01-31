'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingAward extends Model {
    static associate(models) {
      ListingAward.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      ListingAward.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
    }
  }
  ListingAward.init({
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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    awardingOrganization: DataTypes.STRING,
    year: DataTypes.INTEGER,
    category: DataTypes.STRING,
    imageId: {
      type: DataTypes.UUID,
      references: { model: 'media', key: 'id' }
    },
    externalUrl: DataTypes.STRING,
    verificationStatus: {
      type: DataTypes.ENUM('UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED'),
      defaultValue: 'UNVERIFIED'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ListingAward',
    tableName: 'listing_awards',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['year'] },
      { fields: ['verification_status'] }
    ]
  });
  return ListingAward;
};
