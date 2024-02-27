const express = require('express');
const walletService=require("../features/wallet/service");
const tokenService=require("../features/token/service");

const router = express.Router();

router.post("/load-money/:id",tokenService.authenticateToken,walletService.addMoney);
router.post("/transfer/:id",tokenService.authenticateToken,walletService.transfer);
router.get("/wallets/:id",tokenService.authenticateToken,walletService.details);



module.exports = router;