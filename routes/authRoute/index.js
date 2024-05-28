const express = require('express');
const router = express.Router();
const { registerValidator, loginValidator, adminLoginValidator } = require('../../validators/AuthValidator');

const { verifyToken } = require('../../middleware/authMiddleware');

const AuthController = require('../../controllers/AuthController');

const authController = new AuthController();


router.post('/login', loginValidator, authController.login);
router.post('/admin/login', adminLoginValidator, authController.adminLogin);
router.post('/register', registerValidator, authController.register);
router.post('/refresh-token', verifyToken, authController.refreshToken);


module.exports = router;