'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
      UserProfile.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  UserProfile.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    profileImage: DataTypes.STRING,
    aboutMe: DataTypes.TEXT,
    birthPlace: DataTypes.STRING,
    birthday: DataTypes.DATE,
    bloodGroup: DataTypes.STRING,
    gender: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER'),
    maritalStatus: DataTypes.ENUM('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'),
    occupation: DataTypes.STRING,
    companyName: DataTypes.STRING,
    website: DataTypes.STRING,
    books: DataTypes.STRING,
    games: DataTypes.STRING,
    movies: DataTypes.STRING,
    tvShow: DataTypes.STRING,
    musicArtist: DataTypes.STRING,
    writers: DataTypes.STRING,
    hobbies: DataTypes.STRING,
    otherInterest: DataTypes.STRING,
    image: DataTypes.STRING,
    userDashboardImg: DataTypes.STRING,
    // Agent specific fields
    agentDescription: DataTypes.TEXT,
    agentDescriptionImage: DataTypes.STRING,
    agentLogoImage: DataTypes.STRING,
    agentAudioFile: DataTypes.STRING,
    agentProfileViews: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
    tableName: 'user_profiles',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['gender'] },
      { fields: ['occupation'] }
    ]
  });
  return UserProfile;
};
