const {User} =require('../../models/user/user');
const mongoose = require('mongoose');

exports.findUserById = async (_id) => {
    const user = await User.findOne({
        _id,
    });
    if (!user) {
        return false;
    }
    return user;
};

exports.findUserByEmail = async (email) => {
    const user = await User.findOne({
        email,
    });
    if (!user) {
        return false;
    }
    this.addWallet(user.id,)
    return user;
};

exports.addWallet = async (_id,walletId) => {
    const user = await User.findByIdAndUpdate ({
        _id,
    },{walletId:new mongoose.Types.ObjectId(walletId)});
    if (!user) {
        return false;
    }
    return user;
};
