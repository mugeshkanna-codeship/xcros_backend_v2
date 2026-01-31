'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class AgentMessage extends Model {
    static associate(models) {
      AgentMessage.belongsTo(models.User, { foreignKey: 'agentId', as: 'agent' });
    }
  }
  AgentMessage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    agentId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.TEXT,
    pincode: DataTypes.STRING,
    city: DataTypes.STRING,
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AgentMessage',
    tableName: 'agent_messages',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['agent_id'] },
      { fields: ['email'] },
      { fields: ['phone'] },
      { fields: ['domain'] },
      { fields: ['created_at'] }
    ]
  });
  return AgentMessage;
};
