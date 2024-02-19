const express = require('express');
const registerService=require("../features/auth/service");
const router = express.Router();

router.post("/register",registerService.register);


module.exports = router;