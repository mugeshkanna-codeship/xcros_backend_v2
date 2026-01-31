'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Legal extends Model {
    static associate(models) {
      Legal.belongsTo(models.LegalCategory, { foreignKey: 'categoryId', as: 'category' });
    }
  }
  Legal.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.UUID,
      references: { model: 'legal_categories', key: 'id' }
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    type: DataTypes.STRING,
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Legal',
    tableName: 'legals',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['category_id'] },
      { fields: ['type'] },
      { fields: ['domain'] }
    ]
  });
  return Legal;
};
