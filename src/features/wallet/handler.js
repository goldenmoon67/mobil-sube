const { Wallet }=require('../../models/wallet/wallet');
const mongoose = require('mongoose');

const userHandler=require('../user/handler');
const { v4: uuidv4 } = require('uuid');


exports.findById = async (walletId) => {
    const wallet = await Wallet.findOne({
        walletId,
    });
    if (!wallet) {
        return false;
    }
    return wallet;
};


exports.createWallet = async () => {
    const iban = uuidv4(); 
    const data = new Wallet({
        iban:iban,
    });
    const saveResponse = await data.save();
   
    return saveResponse;
};


exports.connectWalletForUser = async (_id,ownerId) => {
    const wallet = await Wallet.findByIdAndUpdate ({
        _id,
    },{owner: mongoose.Types.ObjectID(ownerId)});
    if (!wallet) {
        return false;
    }
    return wallet;
};