const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const dataSchema = new mongoose.Schema({
    iban: {
        required: true,
        type: String,
    },
    owner: {
        type: String,
        ref: 'User'
    },
    balance: {
        required: true,
        type: Number,
        default: 0,
    },
    transactions: [{
        type: mongoose.Types.ObjectId,
        ref: 'Transaction'
    }]

}, { timestamps: true });

function validateUser(user) {
    const schema = Joi.object({
        iban: Joi.string().min(3).max(100).required(),
        owner: Joi.string().min(5).max(255).required().email(),
        transactions:Joi.array().required(),
        balance:Joi.number(),
    })
    return schema.validate(user)
}
module.exports = {
    Wallet: mongoose.model('Wallet', dataSchema),
    validateWallet: validateUser // You might need to rename this function to reflect it's for Wallet
};