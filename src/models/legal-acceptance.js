'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class LegalAcceptance extends Model {
    static associate(models) {
      LegalAcceptance.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  LegalAcceptance.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastAcceptedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    acceptedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'LegalAcceptance',
    tableName: 'legal_acceptances',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['user_id', 'domain'] },
      { fields: ['user_id'] },
      { fields: ['domain'] }
    ]
  });
  return LegalAcceptance;
};
