const express = require('express');
const userService=require("../features/user/service");
const tokenService=require("../features/token/service");
const router = express.Router();

router.get("/users/:id",tokenService.authenticateToken,userService.myProfile);


module.exports = router;