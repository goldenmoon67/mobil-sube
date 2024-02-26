const express = require('express');
const authService=require("../features/auth/service");
const router = express.Router();

router.post("/register",authService.registerStep1);
router.post("/verify-email",authService.verifyUser);
router.post("/login",authService.login);


module.exports = router;