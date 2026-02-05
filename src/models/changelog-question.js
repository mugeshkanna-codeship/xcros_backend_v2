'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ChangeLogQuestion extends Model {
    static associate(models) {
      ChangeLogQuestion.belongsTo(models.ChangeLog, { foreignKey: 'changeLogId', as: 'changeLog' });
    }
  }
  ChangeLogQuestion.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    changeLogId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'ChangeLogs',
        key: 'id'
      }
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ChangeLogQuestion',
    timestamps: true
  });
  return ChangeLogQuestion;
};