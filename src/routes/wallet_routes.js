const express = require('express');
const walletService=require("../features/wallet/service");
const router = express.Router();

router.post("/load-money/:id",walletService.addMoney);
router.post("/transfer/:id",walletService.transfer);



module.exports = router;