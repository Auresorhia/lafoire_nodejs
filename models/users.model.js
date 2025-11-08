const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        prenom: {//Prénom de l’utilisateur
            type: String,
            required: true
        },
        avatar:{//Image/avatar de l’utilisateur
            type: String,
            required: true
        },
        email:{//Email de l’utilisateur
            type: String,
            required: true,
            unique: true
        },
        isActive:{
            type: Boolean,
            default: true
        },
        password:{
            type: String,
            required: true
        },
        role:{
            type:String,
            enum: ['admin', 'user'],
            default: 'user'
        }
    },{ timestamps: { createAt: true } }
)

module.exports = mongoose.model('User', userSchema)