const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/user-info', userController.getUserInfo);
router.get('/matches', userController.getMatches);
router.post('/like-profile', authenticateToken, userController.likeProfile);
router.get('/received-likes/:userId', authenticateToken, userController.getReceivedLikes);
router.post('/create-match', authenticateToken, userController.createMatch);
router.get('/get-matches/:userId', authenticateToken, userController.getMatchedUsers);
router.post('/subscribe', authenticateToken, userController.subscribe);
router.post('/payment-success', userController.paymentSuccess);
router.post('/send-rose', authenticateToken, userController.sendRose);


module.exports = router;