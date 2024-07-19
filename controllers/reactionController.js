const Reaction = require('../models/Reaction');
const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    // get all reactions
    async getReactions(req, res) {
        try {
            const reactions = await Reaction.find();
            res.json(reactions);
        } catch (err) { res.status(422).json(err) }
    },
    // get one reaction
    async getOneReaction(req, res){
        try { 
            const reaction = await Reaction.findOne({ _id: req.params.reactionid});
            if(!reaction) {
                return res.status(404).json({message: 'Sorry something went wrong, the reaction with this id is not located in our records, please double check the value and try again'})
            }
            res.json(reaction);
        } catch (err) { res.status(422).json({message: 'Sorry something went wrong, Please refresh and try again.'})}
    },
    // create a new reaction
    async createReaction(req, res){
        try {
            const reaction = await Reaction.create(req.body);
            const thought = await Thought.findOneAndUpdate(
                { _id: req.body.thoughtId },
                { $addToSet: { reactions: reaction._id } },
                { new: true },
            );

            if(!thought) {
                return res.status(404).json({
                    message: 'This reaction has been generated however an error occured, and this reaction is not associated with any thought, please ensure you are establishing the correct thought id and retry'
                });

            }
            res.status(200).json({message: '👍 Congratulations on posting a new reaction! horay for you!! ❤️'})
        } catch (err) { 
            console.log(err);
            res.status(422).json(err);
        }
    },

    // update a reaction
    async updateReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.reactionId },
                { $set: req.body },
                { runValidators: true, new: true },
            );
            res.status(200).json(reaction);
        } catch(err) {
            console.log(err);
            res.status(422).json(err);
        }
    }
}

