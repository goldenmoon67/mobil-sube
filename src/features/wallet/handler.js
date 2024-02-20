const { Wallet } = require('../../models/wallet/wallet');
const userHandler = require('../user/handler');

const mongoose = require('mongoose');

const transactionHandler = require('../transaction/handler');
const { v4: uuidv4 } = require('uuid');


exports.findById = async (_id) => {
    const wallet = await Wallet.findOne({
        _id,
    });
    if (!wallet) {
        return false;
    }
    return wallet;
};


exports.createWallet = async () => {
    const iban = uuidv4();
    const data = new Wallet({
        iban: iban,
    });
    const saveResponse = await data.save();

    return saveResponse;
};


exports.connectWalletForUser = async (_id, ownerId) => {
    const wallet = await Wallet.findByIdAndUpdate({
        _id,
    }, { owner: ownerId });
    if (!wallet) {
        return false;
    }
    return wallet;
};

exports.addMoney = async (iban, owner, amount) => {
    const wallet = await Wallet.findOne({
        iban
    },);
    if (!wallet) {
        throw Error("Wallet not found");
    }
    if (wallet.owner != owner) {
        console.log(owner);
        console.log(wallet.owner)
        throw Error("User not has permission");
    }
    const response = await transactionHandler.createTransaction("addMoney", amount, null, wallet._id);
    wallet.balance = wallet.balance + amount;
    await wallet.save();
    return response;
};

exports.transfer = async (owner, iban, amount) => {
    console.log(iban);
    const targetWallet = await Wallet.findOne({
        iban:iban
    },);
    if (!targetWallet) {
        throw Error("Target wallet not found");
    }
    const user = await userHandler.findUserById(owner);
    if (!user) {
        throw Error("User not found");
    }
    console.log(user)
    const currentWallet=await this.findById(user.wallet);
    if(!currentWallet){
        throw Error("Wallet not found");
    }
    if(0>(currentWallet.balance-amount)){
        throw Error("Insufficient balance");
    }
    const response = await transactionHandler.createTransaction("transfer", amount, currentWallet.id, targetWallet._id);
    targetWallet.balance = targetWallet.balance + amount;
    currentWallet.balance = currentWallet.balance - amount;
    await targetWallet.save();
    await currentWallet.save();
    return response;
};
