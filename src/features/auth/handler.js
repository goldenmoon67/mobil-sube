const { User } = require('../../models/user/user');
const tokenHandler = require('../token/handler');

const userHandler = require('../user/handler');
const walletHandler = require('../../features/wallet/handler');
const { otpGen } = require('otp-gen-agent');
const bcrypt = require('bcrypt')



exports.createUser = async (email, password, userName) => {
    console.log(password);
    const wallet = await walletHandler.createWallet()
    const data = new User({
        email: email,
        password: password,
        name: userName,
        wallet: wallet.id,
    });
    const saveResponse = await data.save();
    await walletHandler.connectWalletForUser(wallet.id, saveResponse._id);
    return saveResponse;
};

exports.login = async (email, password) => {
    const user = await userHandler.findUserByEmail(email);
    if (!user) {
        throw Error('Authentication failed');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw Error('Authentication failed');
    }
    const tokenResult = tokenHandler.signToken(user);
    return tokenResult;
};


exports.generateOTP = async () => {
    const OTP = await otpGen();
    return OTP;
};