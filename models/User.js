const { Schema, model } = require('mongoose');

// Schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Sorry it does not appear that you have entered a valid email address, please double check and retry.']

        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        toJson: {
            virtuals: true,
            getters: true,
        },

        toObject: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// virtual for friends count
userSchema
    .virtual('friendCount')
    // getter
    .get( function () {
        return this.friends.length;
    })

const User = model('user', userSchema );

module.exports = User;