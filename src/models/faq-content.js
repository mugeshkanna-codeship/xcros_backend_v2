'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class FaqContent extends Model {
    static associate(models) {
      FaqContent.belongsTo(models.FaqPrimary, { foreignKey: 'primaryId', as: 'primary' });
      FaqContent.belongsTo(models.FaqSecondary, { foreignKey: 'secondaryId', as: 'secondary' });
    }
  }
  FaqContent.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    primaryId: {
      type: DataTypes.UUID,
      references: { model: 'faq_primaries', key: 'id' }
    },
    secondaryId: {
      type: DataTypes.UUID,
      references: { model: 'faq_secondaries', key: 'id' }
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FaqContent',
    tableName: 'faq_contents',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['primary_id'] },
      { fields: ['secondary_id'] },
      { fields: ['domain'] }
    ]
  });
  return FaqContent;
};
