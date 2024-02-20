const express = require('express');
const userRoutes=require('./user_routes')
const authRoutes=require('./auth_routes');
const walletRoutes=require('./wallet_routes');
const tokenRoutes=require('./token_routes');
const router = express.Router();
router.use(userRoutes);
router.use(authRoutes);
router.use(walletRoutes);
router.use(tokenRoutes);

module.exports = router;
