'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Testimonial extends Model {
    static associate(models) {
      // Testimonial associations if needed
    }
  }
  Testimonial.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    company: DataTypes.STRING,
    description: DataTypes.TEXT,
    rating: DataTypes.STRING,
    image: DataTypes.STRING,
    placement: DataTypes.STRING,
    slug: DataTypes.STRING,
    pincode: DataTypes.STRING,
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Testimonial',
    tableName: 'testimonials',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['slug'] },
      { fields: ['domain'] },
      { fields: ['placement'] }
    ]
  });
  return Testimonial;
};
