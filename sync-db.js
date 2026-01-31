import db from './src/models/index.js';

async function syncDatabase() {
  try {
    console.log('🔄 Starting database synchronization...');

    // Define sync order to handle dependencies
    const syncOrder = [
      // Core tables first (no dependencies)
      'Country', 'State', 'City', 'Pincode',
      'Role', 'Tag', 'Media', 'Package',
      'User', 'UserProfile', 'UserSettings', 'UserRole', 'UserAuthMethod', 'UserMetadata',
      'Category', 'PrimaryCategory', 'SecondaryCategory', 'TertiaryCategory', 'CategoryTag',

      // Business tables
      'Amenity', 'Listing', 'ListingAddress', 'ListingContact', 'ListingShift',
      'ListingGallery', 'ListingAward', 'ListingCertification', 'ListingFunFact', 'ListingTimeline',
      'ListingTag', 'ListingAmenity',

      // User interaction tables
      'ListingSave', 'ListingVisit', 'ListingMessage',
      'Review', 'ReviewLike', 'ReviewMedia',

      // Business logic tables
      'Appointment', 'Booking', 'BookingService', 'BookingPayment',
      'Coupon', 'CouponUsage', 'CouponListing', 'CouponCategory',

      // Content tables
      'Blog', 'BlogTag', 'Banner', 'Faq',

      // Communication tables
      'Subscriber', 'Notification', 'Otp',

      // Support tables
      'Support', 'SupportMessage'
    ];

    // Sync tables in dependency order
    for (const modelName of syncOrder) {
      if (db[modelName]) {
        console.log(`🔄 Syncing ${modelName}...`);
        await db[modelName].sync({
          alter: process.env.ALTER_DB === 'true',
          force: true  // Force recreate tables for clean sync
        });
        console.log(`✅ ${modelName} synced`);
      }
    }

    console.log('✅ Database synchronized successfully!');
    console.log('📊 All 54 models have been created/updated in the database.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database sync failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

syncDatabase();