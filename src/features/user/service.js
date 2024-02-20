const handler=require('./handler');


exports.myProfile = async (req, res, next) => {
    try {
      const user= await handler.findUserById(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

