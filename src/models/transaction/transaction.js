const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const dataSchema = new mongoose.Schema({
    from: {
        type: String,
        ref: 'Wallet'
    },
    operationType:{
        required: true,
        type: String,
        enum: ['addMoney', 'transfer'], 
    },
    to: {
        type: String,
        ref: 'Wallet'
    },
    amount: {
        required: true,
        type: Number,
    },


}, { timestamps: true });

function validateTransaction(transaction) {
    const schema = Joi.object({
        from: Joi.string().min(3).max(100).required(),
        to: Joi.string().min(5).max(255).required().email(),
        amount:Joi.number().required(),
    })
    return schema.validate(user)
}
module.exports = {
    Transaction: mongoose.model('Transaction', dataSchema),
    validateTransaction: validateTransaction 
};