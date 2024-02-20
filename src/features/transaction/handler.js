const { Transaction } = require('../../models/transaction/transaction');

exports.createTransaction = async (operationType,amount,from, to, ) => {
    const data = new Transaction({
        operationType:operationType,
        to: to,
        from: from,
        amount: amount,
    });
    const saveResponse = await data.save();
    return saveResponse;
};
