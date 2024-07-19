const { Schema, model } = require('mongoose');
const Reaction = require('../models/Reaction');

// Schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now, 
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
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

thoughtSchema.virtual('reactionCoutnt')
    .get(function(){
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;