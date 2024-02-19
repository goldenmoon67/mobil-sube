
exports.getMyWallet = async (req, res, next) => {
    try {
        return res.status(201).json({ message:"My wallet"});
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

