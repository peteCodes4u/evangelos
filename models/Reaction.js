const { Schema, model } = require('mongoose');

// Schema
const reactionSchema = new Schema(
    {
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
{
    toJSON: {
        getters: true,
    },
    toObject: {
        getters: true,
    },
}
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;