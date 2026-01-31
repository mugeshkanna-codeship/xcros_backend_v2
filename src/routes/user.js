import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';

// Routes for users
router.post('/', userController.createUser);
router.get('/', userController.listUsers);
router.post('/ssr', userController.listUsersSSR); // For server-side pagination
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;