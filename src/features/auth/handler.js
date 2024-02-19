const {User} =require('../../models/user/user');
const userHandler=require('../user/handler');
const walletHandler=require('../../features/wallet/handler');
const { otpGen } = require('otp-gen-agent');


exports.createUser = async (email, password,userName) => {
    const wallet= await walletHandler.createWallet()
    const data = new User ({
        email: email,
        password:password,
        name:userName,
        walletId:wallet.id,
    });
    const saveResponse = await data.save();
    walletHandler.connectWalletForUser(wallet.id,saveResponse._id);
    return saveResponse;
};


exports.generateOTP = async () => {
    const OTP = await otpGen();
    return OTP;
};