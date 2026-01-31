'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      Team.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
      Team.hasMany(models.TeamMessage, { foreignKey: 'teamId', as: 'messages' });
    }
  }
  Team.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    domain: DataTypes.STRING,
    placement: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    designation: DataTypes.STRING,
    department: DataTypes.STRING,
    info: DataTypes.TEXT,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    cityId: {
      type: DataTypes.UUID,
      references: { model: 'cities', key: 'id' }
    },
    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING,
    youtube: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    instagram: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
    tableName: 'teams',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['designation'] },
      { fields: ['department'] },
      { fields: ['city_id'] },
      { fields: ['domain'] }
    ]
  });
  return Team;
};
