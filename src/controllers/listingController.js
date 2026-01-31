import db from '../models/index.js';
const Listing = db.Listing;
import commonCrudService from '../services/commonCrudService.js';

const listingController = {
  createListing: async (req, res) => {
    return commonCrudService.createRecord(Listing, req, res, 'listing');
  },

  updateListing: async (req, res) => {
    return commonCrudService.updateRecord(Listing, req, res, 'listing');
  },

  listListings: async (req, res) => {
    return commonCrudService.listRecords(Listing, req, res, 'listing', {
      searchFields: ['name', 'description']
    });
  },

  listListingsSSR: async (req, res) => {
    return commonCrudService.listRecordsSSR(Listing, req, res, 'listing', {
      searchFields: ['name', 'description']
    });
  },

  getListing: async (req, res) => {
    return commonCrudService.findOneRecord(Listing, req, res, 'listing');
  },

  deleteListing: async (req, res) => {
    return commonCrudService.deleteRecord(Listing, req, res, 'listing');
  },
};

export default listingController;