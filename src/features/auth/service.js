const handler=require('./handler');
const bcrypt = require('bcrypt')

exports.register = async  (req, res,next) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)
       const response= await handler.createUser(req.body.email,password,req.body.name);
        res.status(201).json(response);

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};