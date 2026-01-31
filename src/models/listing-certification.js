'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingCertification extends Model {
    static associate(models) {
      ListingCertification.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      ListingCertification.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
    }
  }
  ListingCertification.init({
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
    issuingOrganization: DataTypes.STRING,
    certificateNumber: DataTypes.STRING,
    issueDate: DataTypes.DATE,
    expiryDate: DataTypes.DATE,
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
    modelName: 'ListingCertification',
    tableName: 'listing_certifications',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['certificate_number'] },
      { fields: ['verification_status'] },
      { fields: ['expiry_date'] }
    ]
  });
  return ListingCertification;
};
