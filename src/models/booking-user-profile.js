'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class BookingUserProfile extends Model {
    static associate(models) {
      BookingUserProfile.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      BookingUserProfile.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  BookingUserProfile.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bookingDateLabel: DataTypes.STRING,
    listingItem: DataTypes.STRING,
    listingId: {
      type: DataTypes.UUID,
      references: { model: 'listings', key: 'id' }
    },
    persons: DataTypes.INTEGER,
    bookingStartDate: DataTypes.DATE,
    bookingEndDate: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    paymentState: {
      type: DataTypes.ENUM('Paid', 'Unpaid', 'Pending'),
      defaultValue: 'Pending'
    },
    paymentMethod: DataTypes.STRING,
    description: DataTypes.TEXT,
    profileImage: DataTypes.STRING,
    statusTag: DataTypes.STRING,
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BookingUserProfile',
    tableName: 'booking_user_profiles',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['listing_id'] },
      { fields: ['payment_state'] },
      { fields: ['booking_start_date'] },
      { fields: ['domain'] }
    ]
  });
  return BookingUserProfile;
};
