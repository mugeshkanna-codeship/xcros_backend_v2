'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      Appointment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Appointment.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
      Appointment.belongsTo(models.User, { foreignKey: 'providerId', as: 'provider' });
    }
  }
  Appointment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    appointmentNumber: {
      type: DataTypes.STRING,
      unique: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'listings', key: 'id' }
    },
    providerId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    
    // Appointment details
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    duration: DataTypes.INTEGER, // in minutes
    
    status: {
      type: DataTypes.ENUM('REQUESTED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW'),
      defaultValue: 'REQUESTED'
    },
    
    type: {
      type: DataTypes.ENUM('CONSULTATION', 'SERVICE', 'DEMO', 'MEETING', 'OTHER'),
      defaultValue: 'CONSULTATION'
    },
    
    // Customer details
    customerName: DataTypes.STRING,
    customerEmail: DataTypes.STRING,
    customerPhone: DataTypes.STRING,
    
    subject: DataTypes.STRING,
    description: DataTypes.TEXT,
    requirements: DataTypes.TEXT,
    
    // Provider notes
    providerNotes: DataTypes.TEXT,
    internalNotes: DataTypes.TEXT,
    
    // Tracking
    confirmedAt: DataTypes.DATE,
    startedAt: DataTypes.DATE,
    completedAt: DataTypes.DATE,
    cancelledAt: DataTypes.DATE,
    cancellationReason: DataTypes.TEXT,
    cancelledBy: {
      type: DataTypes.ENUM('USER', 'PROVIDER', 'ADMIN'),
    },
    
    // Location
    location: DataTypes.STRING,
    isOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    meetingUrl: DataTypes.STRING,
    
    // Reminders
    reminderSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reminderSentAt: DataTypes.DATE,
    
    // Metadata
    referralSource: DataTypes.STRING,
    ipAddress: DataTypes.INET
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments',
    underscored: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      { fields: ['appointment_number'] },
      { fields: ['user_id'] },
      { fields: ['listing_id'] },
      { fields: ['provider_id'] },
      { fields: ['status'] },
      { fields: ['appointment_date'] },
      { fields: ['type'] },
      { fields: ['created_at'] }
    ]
  });
  return Appointment;
};
