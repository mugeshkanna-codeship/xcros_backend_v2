import express from 'express';
const router = express.Router();
import listingController from '../controllers/listingController.js';

// Routes for listings
router.post('/', listingController.createListing);
router.get('/', listingController.listListings);
router.post('/ssr', listingController.listListingsSSR);
router.get('/:id', listingController.getListing);
router.put('/:id', listingController.updateListing);
router.delete('/:id', listingController.deleteListing);

export default router;