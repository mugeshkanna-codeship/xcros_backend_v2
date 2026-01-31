'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CourseEnrollment extends Model {
    static associate(models) {
      CourseEnrollment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  CourseEnrollment.init({
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
    courseId: DataTypes.STRING,
    courseName: DataTypes.STRING,
    enrollmentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('Active', 'Completed', 'Dropped'),
      defaultValue: 'Active'
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CourseEnrollment',
    tableName: 'course_enrollments',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['course_id'] },
      { fields: ['status'] },
      { fields: ['domain'] }
    ]
  });
  return CourseEnrollment;
};
