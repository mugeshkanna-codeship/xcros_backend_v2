'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SponsorContact extends Model {
    static associate(models) {
      SponsorContact.belongsTo(models.Sponsor, { foreignKey: 'sponsorId', as: 'sponsor' });
    }
  }
  SponsorContact.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    sponsorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'sponsors', key: 'id' }
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    message: DataTypes.TEXT,
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SponsorContact',
    tableName: 'sponsor_contacts',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['sponsor_id'] },
      { fields: ['email'] },
      { fields: ['domain'] }
    ]
  });
  return SponsorContact;
};
