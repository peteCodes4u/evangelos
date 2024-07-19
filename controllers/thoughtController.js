const Thought = require('../models/Thought');
const User   = require('../models/User');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (err) {res.status(422).json(err);}
    }, 
    // get one thought
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})
            if(!thought) {
                return res.status(404).json({message: 'Sorry something went wrong, that record could not be found please try agian'})
            }

            res.json(thought);
        } catch (err) {res.status(422).json({message: 'Sorry something went wrong, please refresh your browser and try again'});}
    },
    // create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: {thoughts: thought._id} },
                { new: true }
            );

            if(!user) {
                return res.status(404).json({
                    message: 'This thought has been generated but there was an error associating it to a user, please ensure you are logged in and retry'
                });
            }

            res.json({message:'😎 Congratulations on posting a new thought! horay for you!! 🍔'})
        } catch (err) { 
            console.log(err);
            res.status(422).json(err) }
    },
    // update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }

            );
            
            res.json(thought);

        } catch (err) {
            console.log(err);
            res.status(422).json(err);
        }
    },
    
}