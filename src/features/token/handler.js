const {UserToken} = require('../../models/user/user_token');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signToken = async (user) => {
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
        expiresIn: '30m',
    });
    const refreshToken = jwt.sign({ userId: user._id },  process.env.REFRESH_TOKEN_PRIVATE_KEY, {
        expiresIn: '1h',
    });
    const date = new Date();
    
    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await userToken.deleteOne();

    const data = new UserToken({
        token:refreshToken,
        createdAt:date,
        userId:user._id,
    });
    await data.save();

    return {accessToken,refreshToken};
};



exports.verifyRefreshToken = async (refreshToken) => {
    const userToken = await UserToken.findOne({ token: refreshToken });
    if (!userToken){
        throw Error("invalid token");
    }

   const tokenDetails=  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_PRIVATE_KEY);

    if(!tokenDetails){
        throw Error("invalid token");
    }   
    return tokenDetails;
};
exports.verifyToken = async (token) => {
   const tokenDetails=  jwt.verify(token,process.env.ACCESS_TOKEN_PRIVATE_KEY);

    if(!tokenDetails){
        throw Error("invalid token");
    }   
    return tokenDetails;
};

