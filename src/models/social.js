'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Social extends Model {
    static associate(models) {
      // Social associations if needed
    }
  }
  Social.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    type: DataTypes.STRING,
    color: DataTypes.STRING,
    textColor: DataTypes.STRING,
    image: DataTypes.STRING,
    purpose: DataTypes.STRING,
    url: DataTypes.STRING,
    domain: DataTypes.STRING,
    available: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Social',
    tableName: 'socials',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['type'] },
      { fields: ['domain'] },
      { fields: ['purpose'] }
    ]
  });
  return Social;
};
