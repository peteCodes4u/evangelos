const { Schema, model, Types } = require('mongoose');

// reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
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
        id: false,
    },
);

// Thought Schema
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
        reactions: [ reactionSchema ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCoutnt')
    .get( function() {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;