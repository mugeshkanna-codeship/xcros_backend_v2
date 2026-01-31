'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PincodeSubscribers extends Model {
    static associate(models) {
      PincodeSubscribers.belongsTo(models.Pincode, { foreignKey: 'pincodeId', as: 'pincode' });
    }
  }
  PincodeSubscribers.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pincodeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'pincodes', key: 'id' }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    domain: DataTypes.STRING,
    subscribedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'PincodeSubscribers',
    tableName: 'pincode_subscribers',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['pincode_id'] },
      { fields: ['email'] },
      { unique: true, fields: ['pincode_id', 'email'] }
    ]
  });
  return PincodeSubscribers;
};
