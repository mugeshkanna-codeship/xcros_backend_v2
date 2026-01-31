import db from '../models/index.js';
const User = db.User;
import commonCrudService from '../services/commonCrudService.js';

const userController = {
  createUser: async (req, res) => {
    return commonCrudService.createRecord(User, req, res, 'user');
  },

  updateUser: async (req, res) => {
    return commonCrudService.updateRecord(User, req, res, 'user');
  },

  listUsers: async (req, res) => {
    return commonCrudService.listRecords(User, req, res, 'user', {
      searchFields: ['name', 'email', 'mobile']
    });
  },

  listUsersSSR: async (req, res) => {
    return commonCrudService.listRecordsSSR(User, req, res, 'user', {
      searchFields: ['name', 'email', 'mobile']
    });
  },

  getUser: async (req, res) => {
    return commonCrudService.findOneRecord(User, req, res, 'user');
  },

  deleteUser: async (req, res) => {
    return commonCrudService.deleteRecord(User, req, res, 'user');
  },
};

export default userController;