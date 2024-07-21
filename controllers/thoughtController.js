const Thought = require('../models/Thought');
const User   = require('../models/User');

const error500 = { message: '💀 sorry, it seems something is awry, please restart and try again' }
const error422 = { message: '😵 sorry, something went wrong, please try again after checking the values you have supplied as parameters or in the body.' }
const error404 = { message: '🤔 Sorry, the value supplied as a parameter is not found found in our records, please check the id supplied and try again.' }


module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (err) {res.status(500).json(error500);}
    }, 
    // get one thought
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId});
            if(!thought) {
                return res.status(404).json(error404)
            }

            res.json(thought);
        } catch (err) {res.status(422).json(error422);}
    },
    // create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true },
            );

            if(!user) {
                return res.status(404).json({
                    message: '😲 This thought has been generated but there was an error associating it to a user, please double check your userId value and try again'
                });
            }

            res.status(200).json({message:'😎 Congratulations on posting a new thought! horay for you!! 🍔'})
        } catch (err) { 
            console.log(err);
            res.status(422).json(error422); }
    },
    // update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true },

            );
            
            res.status(200).json(thought);

        } catch (err) {
            console.log(err);
            res.status(422).json(error422);
        }
    },
    // delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if(!thought) {
                return res.status(404).json({message: '🤔 something went wrong, there is no thought in our records with this id, please check the value and try again'})
            }
            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true },
            );
            if(!user) {
                return res.status(404).json({message: '💀 something went wrong, there is no user with this id to remove this thought from, please double check the user id and try again'});
            }
            res.status(200).json({message: '🧙‍♂️... and poof! This thought has been successfully deleted'});
            } catch(err) { res.status(422).json(error422)}
    },
    // add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true },
            );
            if(!thought){
                return res.status(404).json({message: '🤔 Sorry, something went wrong, please ensure your are supplying a valid thought id, refresh and try again'})
            }

            res.status(200).json(thought);

        } catch (err) { res.status(422).json(error422);}
    },

    // remove reaction from thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: {reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if(!thought) {
                return res.status(404).json({message: '🤔 sorry there does not seem to be any thoughts with that id that matches our records, please double check the id and try again'})
            }
            res.status(200).json({message: '⚰️ you have successfully deleted this reaction'});
        } catch(err) { res.status(422).json(error422); }
    },

    
};