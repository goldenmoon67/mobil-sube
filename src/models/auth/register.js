const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({


    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 100

    },
   
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

module.exports.User = mongoose.model('RegisterModel', dataSchema)