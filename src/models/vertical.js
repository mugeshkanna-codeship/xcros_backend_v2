'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Vertical extends Model {
    static associate(models) {
      // Verticals represent entire business domains/sites
    }
  }
  Vertical.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    url: DataTypes.STRING,
    siteName: DataTypes.STRING,
    siteTagline: DataTypes.STRING,
    projectSlogan: DataTypes.STRING,
    siteLandingDescription: DataTypes.TEXT,
    promoVideoTitle: DataTypes.STRING,
    promoVideoDescription: DataTypes.TEXT,
    siteLandingImage: DataTypes.STRING,
    logo: DataTypes.STRING,
    logo2: DataTypes.STRING,
    favicon: DataTypes.STRING,
    promoVideo: DataTypes.STRING,
    primaryColor: DataTypes.STRING,
    secondaryColor: DataTypes.STRING,
    tertiaryColor: DataTypes.STRING,
    sectionPrimaryColor: DataTypes.STRING,
    directoryBanner: DataTypes.STRING,
    directoryTagline: DataTypes.STRING,
    directoryProjectSlogan: DataTypes.STRING,
    directoryTitle: DataTypes.STRING,
    directoryRefUrl: DataTypes.STRING,
    sponsorRefUrl1: DataTypes.STRING,
    sponsorRefUrl2: DataTypes.STRING,
    sponsorRefUrl3: DataTypes.STRING,
    sponsorBg1: DataTypes.STRING,
    sponsorBg2: DataTypes.STRING,
    sponsorBg3: DataTypes.STRING,
    sponsorOverlay1: DataTypes.STRING,
    sponsorOverlay2: DataTypes.STRING,
    sponsorOverlay3: DataTypes.STRING,
    projectagentName: DataTypes.STRING,
    projectagentImage: DataTypes.STRING,
    projectagentLogoImage: DataTypes.STRING,
    projectagentEmail: DataTypes.STRING,
    projectagentMobile: DataTypes.STRING,
    projectagentAddress: DataTypes.STRING,
    projectagentDescription: DataTypes.TEXT,
    projectagentPageCounter: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    projectagentDescriptionImage: DataTypes.STRING,
    projectLinkFacebook: DataTypes.STRING,
    projectLinkTwitter: DataTypes.STRING,
    projectLinkInstagram: DataTypes.STRING,
    projectLinkYoutube: DataTypes.STRING,
    projectLinkWhatsapp: DataTypes.STRING,
    quoteImage: DataTypes.STRING,
    quote: DataTypes.TEXT,
    didYouKnowImage: DataTypes.STRING,
    didYouKnowQuote: DataTypes.TEXT,
    youShouldKnowImage: DataTypes.STRING,
    youShouldKnowQuote: DataTypes.TEXT,
    communityVideo: DataTypes.STRING,
    businessVideo: DataTypes.STRING,
    externalLinks: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    industryName: DataTypes.STRING,
    categoryName: DataTypes.STRING,
    pageNotFoundImage: DataTypes.STRING,
    helpcenterBannerImage: DataTypes.STRING,
    contactUsBannerImage: DataTypes.STRING,
    contactUsCustomerImage: DataTypes.STRING,
    teamBannerImage: DataTypes.STRING,
    categoryDirectoryBanner: DataTypes.STRING,
    locationDirectoryBanner: DataTypes.STRING,
    marketsBannerImage: DataTypes.STRING,
    socialBannerImage: DataTypes.STRING,
    aboutDescription: DataTypes.TEXT,
    aboutFeatures: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    aboutPhoto: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    aboutVideo: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    aboutUpdates: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    publishDate: DataTypes.STRING,
    compatibleBrowser: DataTypes.STRING,
    compatibleResolutions: DataTypes.STRING,
    serviceProvider: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    markets: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    services: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of services: name, category, description, image'
    },
    partners: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of partners: name, category, description, image, url'
    },
    domain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vertical',
    tableName: 'verticals',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['url'] },
      { fields: ['site_name'] },
      { fields: ['domain'] }
    ]
  });
  return Vertical;
};
