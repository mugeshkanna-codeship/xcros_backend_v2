'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class RealEstateAgent extends Model {
    static associate(models) {
      RealEstateAgent.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  RealEstateAgent.init({
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
    profileUrl: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    yearOfMembership: DataTypes.INTEGER,
    numberOfProperties: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    numberOfViews: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    about: DataTypes.TEXT,
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    follow: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of social platforms: platform, id_url'
    },
    numberOfArticles: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    designation: DataTypes.STRING,
    latestBlog: DataTypes.STRING,
    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    specialties: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    experienceYears: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    bio: DataTypes.TEXT,
    company: DataTypes.STRING,
    website: DataTypes.STRING,
    certifications: {
      type: DataTypes.JSONB,
      defaultValue: []
    }
  }, {
    sequelize,
    modelName: 'RealEstateAgent',
    tableName: 'real_estate_agents',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['email'] },
      { fields: ['license_number'] }
    ]
  });
  return RealEstateAgent;
};
