const handler = require('./handler');
const jwt = require('jsonwebtoken');

exports.getNewAccessToken = async (req, res, next) => {
    try {
        const tokenDetails = handler.verifyRefreshToken(req.body.refreshToken);
        const accessToken = jwt.sign({ userId: tokenDetails._id }, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "30m" });
        res.status(201).json({ accessToken: accessToken });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            throw Error("Unauthorization")
        }
        const user =await handler.verifyToken(token);
        if (user) {
            req.user = user;
            next();
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }

};

