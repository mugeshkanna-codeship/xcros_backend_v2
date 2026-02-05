'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ChangeLog extends Model {
    static associate(models) {
      ChangeLog.hasMany(models.ChangeLogQuestion, { foreignKey: 'changeLogId', as: 'questions' });
    }
  }
  ChangeLog.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    placement: {
      type: DataTypes.STRING,
      allowNull: true
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'ChangeLog',
    timestamps: true
  });
  return ChangeLog;
};