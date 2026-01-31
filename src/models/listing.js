'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Listing extends Model {
    static associate(models) {
      // Category associations
      Listing.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      Listing.belongsTo(models.PrimaryCategory, { foreignKey: 'primaryCategoryId', as: 'primaryCategory' });
      Listing.belongsTo(models.SecondaryCategory, { foreignKey: 'secondaryCategoryId', as: 'secondaryCategory' });
      Listing.belongsTo(models.TertiaryCategory, { foreignKey: 'tertiaryCategoryId', as: 'tertiaryCategory' });
      
      // Location associations
      Listing.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country' });
      Listing.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
      Listing.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
      Listing.belongsTo(models.Pincode, { foreignKey: 'pincodeId', as: 'pincode' });
      
      // User associations
      Listing.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Listing.belongsTo(models.User, { foreignKey: 'agentId', as: 'agent' });
      
      // Media associations
      Listing.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
      Listing.belongsTo(models.Media, { foreignKey: 'bannerImageId', as: 'bannerImage' });
      
      // Related tables
      Listing.hasMany(models.ListingAddress, { foreignKey: 'listingId', as: 'addresses' });
      Listing.hasMany(models.ListingContact, { foreignKey: 'listingId', as: 'contacts' });
      Listing.hasMany(models.ListingGallery, { foreignKey: 'listingId', as: 'gallery' });
      Listing.hasMany(models.ListingShift, { foreignKey: 'listingId', as: 'shifts' });
      Listing.hasMany(models.ListingAward, { foreignKey: 'listingId', as: 'awards' });
      Listing.hasMany(models.ListingCertification, { foreignKey: 'listingId', as: 'certifications' });
      Listing.hasMany(models.ListingFunFact, { foreignKey: 'listingId', as: 'funFacts' });
      Listing.hasMany(models.ListingTimeline, { foreignKey: 'listingId', as: 'timeline' });
      
      // Many-to-many associations
      Listing.belongsToMany(models.Tag, { 
        through: models.ListingTag, 
        foreignKey: 'listingId',
        otherKey: 'tagId',
        as: 'tags'
      });
      
      Listing.belongsToMany(models.Amenity, { 
        through: models.ListingAmenity, 
        foreignKey: 'listingId',
        otherKey: 'amenityId',
        as: 'amenities'
      });
    }
  }
  Listing.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.TEXT,
    shortDescription: DataTypes.STRING(500),
    metaTitle: DataTypes.STRING,
    metaKeywords: DataTypes.STRING,
    metaDescription: DataTypes.TEXT,
    
    // Category references
    categoryId: {
      type: DataTypes.UUID,
      references: { model: 'categories', key: 'id' }
    },
    primaryCategoryId: {
      type: DataTypes.UUID,
      references: { model: 'primary_categories', key: 'id' }
    },
    secondaryCategoryId: {
      type: DataTypes.UUID,
      references: { model: 'secondary_categories', key: 'id' }
    },
    tertiaryCategoryId: {
      type: DataTypes.UUID,
      references: { model: 'tertiary_categories', key: 'id' }
    },
    
    // Location references
    countryId: {
      type: DataTypes.UUID,
      references: { model: 'countries', key: 'id' }
    },
    stateId: {
      type: DataTypes.UUID,
      references: { model: 'states', key: 'id' }
    },
    cityId: {
      type: DataTypes.UUID,
      references: { model: 'cities', key: 'id' }
    },
    pincodeId: {
      type: DataTypes.UUID,
      references: { model: 'pincodes', key: 'id' }
    },
    
    // User references
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    agentId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' }
    },
    
    // Media references
    imageId: {
      type: DataTypes.UUID,
      references: { model: 'media', key: 'id' }
    },
    bannerImageId: {
      type: DataTypes.UUID,
      references: { model: 'media', key: 'id' }
    },
    
    // Basic fields
    domain: DataTypes.STRING,
    listingId: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM('SIMPLE', 'PREMIUM', 'FEATURED'),
      defaultValue: 'SIMPLE'
    },
    status: {
      type: DataTypes.ENUM('DRAFT', 'PENDING_APPROVAL', 'ACTIVE', 'INACTIVE', 'REJECTED'),
      defaultValue: 'DRAFT'
    },
    
    // Location details
    latitude: DataTypes.DECIMAL(10, 8),
    longitude: DataTypes.DECIMAL(11, 8),
    address: DataTypes.TEXT,
    
    // Pricing
    priceType: DataTypes.ENUM('FREE', 'FIXED', 'RANGE', 'NEGOTIABLE'),
    priceMin: DataTypes.DECIMAL(10, 2),
    priceMax: DataTypes.DECIMAL(10, 2),
    currency: DataTypes.STRING(3),
    discount: DataTypes.DECIMAL(5, 2),
    
    // Visibility & features
    showInCity: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isStore: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    // Stats
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    bookmarkCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    rating: DataTypes.DECIMAL(2, 1),
    
    // Business info
    yearEstablished: DataTypes.INTEGER,
    ownerName: DataTypes.STRING,
    gstNumber: DataTypes.STRING,
    businessHours: DataTypes.STRING,
    
    // SEO & content
    aboutContent: DataTypes.TEXT,
    termsConditions: DataTypes.TEXT,
    privacyPolicy: DataTypes.TEXT,
    disclaimer: DataTypes.TEXT,
    
    // Timestamps
    publishedAt: DataTypes.DATE,
    featuredAt: DataTypes.DATE,
    verifiedAt: DataTypes.DATE,
    lastModifiedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Listing',
    tableName: 'listings',
    underscored: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['agent_id'] },
      { fields: ['category_id'] },
      { fields: ['primary_category_id'] },
      { fields: ['city_id'] },
      { fields: ['status'] },
      { fields: ['type'] },
      { fields: ['slug'] },
      { fields: ['domain'] },
      { fields: ['latitude', 'longitude'] },
      { fields: ['is_featured'] },
      { fields: ['is_verified'] },
      { fields: ['published_at'] },
      { fields: ['rating'] },
      { fields: ['view_count'] }
    ]
  });
  return Listing;
};
