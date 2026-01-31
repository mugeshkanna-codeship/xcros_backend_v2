import db from './src/models/index.js';

async function syncDatabase() {
  try {
    console.log('🔄 Starting database synchronization...');

    // Define sync order to handle dependencies
    const syncOrder = [
      // Core location tables first (no dependencies)
      'Country', 'State', 'City', 'Pincode',
      
      // Location info and utilities
      'CityInfo', 'CityLanding', 'PincodeInfo', 'PincodeSubscribers', 'LocationLaunch',
      
      // Core system tables
      'Role', 'Tag', 'Media', 'Package',
      
      // User management
      'User', 'UserProfile', 'UserSettings', 'UserRole', 'UserAuthMethod', 'UserMetadata',
      'ProfileDashboard', 'ReviewUserProfile', 'BookingUserProfile',
      
      // Category hierarchy
      'Category', 'PrimaryCategory', 'SecondaryCategory', 'TertiaryCategory', 'CategoryTag',
      'ProductCategory',
      
      // Business configuration
      'Vertical', 'Brand', 'Market', 'ServiceMarketplace', 'Experience', 'Client',
      
      // Pricing tables
      'PricingType', 'PricingPackage', 'Pricing', 'PricingAddon',
      
      // Legal and compliance
      'LegalCategory', 'Legal', 'LegalAcceptance',
      
      // Amenities
      'Amenity',
      
      // Listings (main business entity)
      'Listing', 'ListingAddress', 'ListingContact', 'ListingShift',
      'ListingGallery', 'ListingAward', 'ListingCertification', 'ListingFunFact', 'ListingTimeline',
      'ListingTag', 'ListingAmenity', 'ListingFrontend', 'ListingSubscribers',
      
      // Listing interactions
      'ListingSave', 'ListingVisit', 'ListingMessage', 'DislikeListing', 'Interested',
      
      // Reviews
      'Review', 'ReviewLike', 'ReviewMedia',
      
      // Reports
      'ReportListing', 'ReportReview',
      
      // Agent management
      'AgentMessage', 'AgentReview', 'AgentReviewLike', 'RealEstateAgent',
      
      // Bookings
      'Appointment', 'Booking', 'BookingService', 'BookingPayment',
      
      // Coupons
      'Coupon', 'CouponUsage', 'CouponListing', 'CouponCategory', 'CouponEnquiry',
      
      // Promotions
      'PromotedListing', 'PromotedProduct', 'RecommendedListing', 'DealOfTheDay',
      
      // Sponsors
      'Sponsor', 'SponsorContact',
      
      // Team
      'Team', 'TeamMessage',
      
      // Content management
      'Blog', 'BlogTag', 'Banner', 'Testimonial', 'Social',
      
      // FAQs
      'FaqPrimary', 'FaqSecondary', 'FaqContent', 'FaqGeneral', 'FaqListing', 'FaqListingContent', 'Faq',
      
      // Communication
      'Subscriber', 'Notification', 'Otp',
      
      // Support
      'Support', 'SupportMessage',
      
      // Education
      'CourseEnrollment'
    ];

    // Sync tables in dependency order
    let syncedCount = 0;
    for (const modelName of syncOrder) {
      if (db[modelName]) {
        console.log(`🔄 Syncing ${modelName}...`);
        await db[modelName].sync({
          alter: process.env.ALTER_DB === 'true',
          force: true  // Force recreate tables for clean sync
        });
        console.log(`✅ ${modelName} synced`);
        syncedCount++;
      } else {
        console.warn(`⚠️  Model ${modelName} not found in database models`);
      }
    }

    console.log('✅ Database synchronized successfully!');
    console.log(`📊 ${syncedCount} models have been created/updated in the database.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Database sync failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

syncDatabase();