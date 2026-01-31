'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ListingFunFact extends Model {
    static associate(models) {
      ListingFunFact.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  ListingFunFact.init({
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
    number: DataTypes.STRING,
    unit: DataTypes.STRING,
    icon: DataTypes.STRING,
    category: {
      type: DataTypes.ENUM('STATISTICS', 'ACHIEVEMENT', 'EXPERIENCE', 'CAPACITY', 'OTHER'),
      defaultValue: 'OTHER'
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ListingFunFact',
    tableName: 'listing_fun_facts',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['category'] },
      { fields: ['sort_order'] }
    ]
  });
  return ListingFunFact;
};
