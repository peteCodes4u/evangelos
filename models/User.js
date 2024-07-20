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
                ref: 'Thought',
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
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// virtual for friends count
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema );

module.exports = User;