'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class TeamMessage extends Model {
    static associate(models) {
      TeamMessage.belongsTo(models.Team, { foreignKey: 'teamId', as: 'team' });
    }
  }
  TeamMessage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    teamId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'teams', key: 'id' }
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.TEXT,
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TeamMessage',
    tableName: 'team_messages',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['team_id'] },
      { fields: ['email'] },
      { fields: ['domain'] }
    ]
  });
  return TeamMessage;
};
