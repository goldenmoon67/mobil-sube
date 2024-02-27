const { Wallet } = require('../../models/wallet/wallet');
const userHandler = require('../user/handler');

const mongoose = require('mongoose');

const transactionHandler = require('../transaction/handler');
const { v4: uuidv4 } = require('uuid');
const user = require('../../models/user/user');
const filterUtils = require("../../utils/filter-utils")

exports.findById = async (_id) => {
    const wallet = await Wallet.findOne({
        _id,
    });
    if (!wallet) {
        return false;
    }
    return wallet;
};

exports.findAll = async (query) => {

    var { search_field, search_value } = {};

    Object.keys(query).forEach((key) => {
        console.log(key, query[key]);
        search_field = key;
        search_value = filterUtils.filterSearchField(query.query_paramater,search_field == "balance" ? false : true, query[key]);
    });
    const queryObj = {};

    if (search_field !== '' && search_value !== '') {
        queryObj[search_field] = search_value;
    }
    console.log(search_field);
    console.log(search_value);



    console.log('::queryObj:::', queryObj);
    const wallets = await Wallet.find(queryObj);
    if (!wallets) {
        return false;
    }
    return wallets;
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
        throw Error("User not has permission");
    }
    const user = await userHandler.findUserById(owner);
    if (!user) {
        throw Error("User not found");
    }
    const response = await transactionHandler.createTransaction("addMoney", amount, null, wallet._id);
    wallet.balance = wallet.balance + amount;
    wallet.transactions.push(response._id);
    user.transactions.push(response._id);
    await wallet.save();
    await user.save();

    return response;
};

exports.transfer = async (owner, iban, amount) => {
    const targetWallet = await Wallet.findOne({
        iban: iban
    },);
    if (!targetWallet) {
        throw Error("Target wallet not found");
    }
    const user = await userHandler.findUserById(owner);
    if (!user) {
        throw Error("User not found");
    }
    const currentWallet = await this.findById(user.wallet);
    if (!currentWallet) {
        throw Error("Wallet not found");
    }
    if (0 > (currentWallet.balance - amount)) {
        throw Error("Insufficient balance");
    }
    const response = await transactionHandler.createTransaction("transfer", amount, currentWallet.id, targetWallet._id);
    targetWallet.balance = targetWallet.balance + amount;
    currentWallet.balance = currentWallet.balance - amount;
    targetWallet.transactions.push(response._id);
    currentWallet.transactions.push(response._id);
    await targetWallet.save();
    await currentWallet.save();
    user.transactions.push(response._id);
    await user.save();

    return response;
};
