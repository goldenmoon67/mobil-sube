const { User } = require('../../models/user/user');
const tokenHandler = require('../token/handler');
const consts = require("../../consts/consts");
const userHandler = require('../user/handler');
const walletHandler = require('../../features/wallet/handler');
const RegisterModel = require("../../models/auth/register");
const { otpGen } = require('otp-gen-agent');
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
require('dotenv').config();

const api_key = process.env.SENDGRID_API_KEY;

const transporter = nodemailer.createTransport(sendgridTransport(
    {
        auth: {
            api_key: api_key,
        }
    }
));

exports.createUser = async (email, password) => {
    const wallet = await walletHandler.createWallet()
    const data = new User({
        email: email,
        password: password,
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

exports.verifyEmail = async (email, otpCode, password) => {
    const user = await RegisterModel.findOne({ email });
    if (!user) {
        throw Error('User not found');
    }
    if (otpCode != user.otpCode) {
        throw Error("Invalid otpCode");
    }
   const createdUser=this.createUser(email,password);
   if(!createdUser){
    throw Error("Registiration step could not complate");
   }
   await RegisterModel.findOneAndDelete({email:email});
    return createdUser;
};

exports.registerStep1 = async (email) => {
    const registeredUser = await userHandler.findUserByEmail(email);
    if (registeredUser) {
        throw Error('Already Registered');
    }
    const user = await RegisterModel.findOne({ email });
    if (!user) {
        const otpCode = await this.generateOTP();
        await RegisterModel.create({ email: email, otpCode: otpCode });
        await this.sendMail(email, otpCode);
        return true;

    } else {
        const otpCode = await this.generateOTP();
        var _id = user._id;
        await RegisterModel.findByIdAndUpdate({ _id }, { email: email, otpCode: otpCode });
        await this.sendMail(email, otpCode);
        return true;
    }
    return false;
};

exports.sendMail = async (email, otpCode) => {
    const response = await transporter.sendMail({
        to: email,
        from: "mirac@z2h.it",
        subject: "Doğrulama E postası Mobil Şube",
        html: consts.VERIFYMAILHTML(otpCode),
    });
    return response;
};

exports.generateOTP = async () => {
    const OTP = await otpGen();
    return OTP;
};