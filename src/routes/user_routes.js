const express = require('express');
const userService=require("../features/user/service");
const router = express.Router();

router.get("/users/my_wallet",userService.getMyWallet);
router.post("",userService.getMyWallet);


module.exports = router;