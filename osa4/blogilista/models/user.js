const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        unique: true,
        required: true,
    },
    name: {
        type: String,
    },
    passwordHash: {
        type: String,
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
