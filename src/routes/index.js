import userRoutes from './user.js';
import listingRoutes from './listing.js';

export const setupRoutes = (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/listings', listingRoutes);
};

export default {
  userRoutes,
  listingRoutes
};