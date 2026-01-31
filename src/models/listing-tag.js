'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingTag extends Model {
    static associate(models) {
      ListingTag.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      ListingTag.belongsTo(models.Tag, { foreignKey: 'tagId', as: 'tag' });
    }
  }
  ListingTag.init({
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
    tagId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'tags', key: 'id' }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ListingTag',
    tableName: 'listing_tags',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['listing_id', 'tag_id'] },
      { fields: ['listing_id'] },
      { fields: ['tag_id'] }
    ]
  });
  return ListingTag;
};
