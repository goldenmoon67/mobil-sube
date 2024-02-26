const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({


    email: {
        required: true,
        type: String
    },
    otpCode: {
        required: true,
        type: String
    }
   
});
function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(100).required()
    })
    return schema.validate(user)
}

module.exports.validate = validateUser

module.exports = mongoose.model('RegisterModel', dataSchema)