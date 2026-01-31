'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Media extends Model {
    static associate(models) {
      Media.belongsTo(models.User, { foreignKey: 'uploadedBy', as: 'uploader' });
    }
  }
  Media.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    originalName: DataTypes.STRING,
    mimeType: DataTypes.STRING,
    size: DataTypes.INTEGER,
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnailUrl: DataTypes.STRING,
    alt: DataTypes.STRING,
    caption: DataTypes.TEXT,
    type: {
      type: DataTypes.ENUM('IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT', 'OTHER'),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('PROFILE', 'LISTING', 'BANNER', 'GALLERY', 'CERTIFICATE', 'DOCUMENT', 'OTHER'),
      defaultValue: 'OTHER'
    },
    uploadedBy: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    duration: DataTypes.INTEGER, // for videos/audio
    metadata: DataTypes.JSONB,
    status: {
      type: DataTypes.ENUM('PENDING', 'PROCESSING', 'ACTIVE', 'REJECTED'),
      defaultValue: 'PENDING'
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    tags: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Media',
    tableName: 'media',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['uploaded_by'] },
      { fields: ['type'] },
      { fields: ['category'] },
      { fields: ['status'] },
      { fields: ['filename'] },
      { fields: ['mime_type'] }
    ]
  });
  return Media;
};
