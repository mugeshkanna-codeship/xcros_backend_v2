'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingSave extends Model {
    static associate(models) {
      ListingSave.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      ListingSave.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  ListingSave.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'listings', key: 'id' }
    },
    type: {
      type: DataTypes.ENUM('BOOKMARK', 'FAVORITE', 'WISHLIST', 'COMPARE'),
      defaultValue: 'BOOKMARK'
    },
    notes: DataTypes.TEXT,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ListingSave',
    tableName: 'listing_saves',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['user_id', 'listing_id', 'type'] },
      { fields: ['user_id'] },
      { fields: ['listing_id'] },
      { fields: ['type'] }
    ]
  });
  return ListingSave;
};
