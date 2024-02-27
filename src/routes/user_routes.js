const express = require('express');
const userService=require("../features/user/service");
const tokenService=require("../features/token/service");
const router = express.Router();

router.get("/users/:id",tokenService.authenticateToken,userService.myProfile);
router.get("/users",tokenService.authenticateToken,userService.myProfile);

router.put("/users",tokenService.authenticateToken,userService.updateUserName);


module.exports = router;