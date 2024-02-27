const handler=require('./handler');


exports.myProfile = async (req, res, next) => {
    var userId;
    if(req.params.id){
        userId=req.params.id;
    }else{
        userId=req.user.userId;
    }

    try {
      const user= await handler.findUserById(userId);
        return res.status(200).json(user);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.updateUserName = async (req, res, next) => {
    try {
        const name=req.body.name;
      const user= await handler.updateUserName(req.user.userId,name);
        return res.status(200).json();
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

