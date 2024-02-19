const express = require('express');
const userRoutes=require('./user_routes')
const authRoutes=require('./register_routes');
const router = express.Router();
router.use(userRoutes);
router.use(authRoutes);

module.exports = router;
