const express = require('express');
const userRoutes=require('./user_routes')
const authRoutes=require('./register_routes');
const walletRoutes=require('./wallet_routes');
const router = express.Router();
router.use(userRoutes);
router.use(authRoutes);
router.use(walletRoutes);

module.exports = router;
