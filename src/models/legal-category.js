'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class LegalCategory extends Model {
    static associate(models) {
      LegalCategory.hasMany(models.Legal, { foreignKey: 'categoryId', as: 'legalDocs' });
    }
  }
  LegalCategory.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    primary: DataTypes.STRING,
    secondary: DataTypes.STRING,
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    type: DataTypes.STRING,
    sequence: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    primarySequence: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    secondarySequence: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LegalCategory',
    tableName: 'legal_categories',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['category'] },
      { fields: ['domain'] },
      { fields: ['sequence'] }
    ]
  });
  return LegalCategory;
};
