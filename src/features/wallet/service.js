const handler=require("./handler");

exports.addMoney = async  (req, res,next) => {
    try {
        const amount = req.body.amount;
        const iban = req.body.iban;
        const owner=req.user.userId;
        const response= await handler.addMoney(iban,owner,amount);
        res.status(201).json(response);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.transfer = async  (req, res,next) => {
    try {
        const amount = req.body.amount;
        const iban = req.body.iban;
        const owner=req.params.id;
        const response= await handler.transfer(owner,iban,amount);
        res.status(201).json(response);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.details = async  (req, res,next) => {
    try {
        const id = req.params.id;
        const response= await handler.findById(id);
        if(!response){
            throw Error("Wallet not found");
        }
        res.status(201).json(response);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.allWallets = async  (req, res,next) => {
    try {
        const query=req.query;
        const response= await handler.findAll(query);
        if(!response){
            throw Error("Wallet not found");
        }
        res.status(201).json({docs:response});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};