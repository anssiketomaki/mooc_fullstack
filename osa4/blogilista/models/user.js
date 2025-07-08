const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        required: true,
    },
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    passwordHash: {
        type: String,
        minlength: 3,
        required: true,
    }
})

userSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)
