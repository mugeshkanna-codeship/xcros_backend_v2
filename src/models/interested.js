'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Interested extends Model {
    static associate(models) {
      // General interest/inquiry model
    }
  }
  Interested.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    message: DataTypes.TEXT,
    attachments: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    image: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Mirror field for admin UI compatibility'
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Interested',
    tableName: 'interested',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['email'] },
      { fields: ['domain'] }
    ]
  });
  return Interested;
};
