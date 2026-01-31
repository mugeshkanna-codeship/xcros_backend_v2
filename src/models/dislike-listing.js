'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class DislikeListing extends Model {
    static associate(models) {
      DislikeListing.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      DislikeListing.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  DislikeListing.init({
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DislikeListing',
    tableName: 'dislike_listings',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['listing_id', 'user_id'] },
      { fields: ['listing_id'] },
      { fields: ['user_id'] },
      { fields: ['domain'] }
    ]
  });
  return DislikeListing;
};
