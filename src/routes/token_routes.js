const express = require('express');
const tokenService=require("../features/token/service");
const router = express.Router();

router.post("/refresh-token",tokenService.getNewAccessToken);


module.exports = router;