'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Experience extends Model {
    static associate(models) {
      // Experience/achievement records
    }
  }
  Experience.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    uid: DataTypes.STRING,
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Experience',
    tableName: 'experiences',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['slug'] },
      { fields: ['domain'] }
    ]
  });
  return Experience;
};
