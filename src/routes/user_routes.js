const express = require('express');
const userService=require("../features/user/service");
const router = express.Router();

router.get("/users/:id",userService.myProfile);


module.exports = router;