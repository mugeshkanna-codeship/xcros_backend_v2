'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class FaqGeneral extends Model {
    static associate(models) {
      // General FAQs for the platform
    }
  }
  FaqGeneral.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    roleType: {
      type: DataTypes.ENUM('AGENT', 'USER'),
      allowNull: false
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'FaqGeneral',
    tableName: 'faq_generals',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['role_type'] },
      { fields: ['service'] },
      { fields: ['topic'] },
      { fields: ['domain'] },
      { fields: ['views'] }
    ]
  });
  return FaqGeneral;
};
