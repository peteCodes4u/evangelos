const Thought = require('../models/Thought');
const User = require('../models/User');

const error500 = { message: '💀 sorry, it seems something is awry, please restart and try again' }
const error422 = { message: '😵 sorry, something went wrong, please try again after checking the values you have supplied as parameters or in the body.' }
const error404 = { message: '🤔 Sorry, the value supplied as a parameter is not found found in our records, please check the id supplied and try again.' }

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err){
            res.status(500).json(error500);
        }
    },
    // get single user
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')

            if (!user) {
                return res.status(404).json(error404);
            }

            res.json(user);

        } catch (err) {
            res.status(422).json(error422);
        }
    },

    // create a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(422).json(error422);
        }
    },

    // update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true },
            );
            if(!user) {
                return res.status(404).json(error404);
            }
            res.json(user);

        } catch (err) {res.status(422).json(error422);}
    },

    // delete a user 
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.userId },
            );
            if(!user) {
                return res.status(404).json(error404);
            }

            await Thought.deleteMany({ username: user.username });
            res.status(200).json({message: '⚰️ The user has been successfully deleted, along with thier associated thought records ☠️'})
        } catch(err){res.status(422).json(error422)}
    },

    // add a friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');

            if(!user){
                return res.status(404).json(error404)
            }

            res.status(200).json(user);

        } catch(err){res.status(422).json(error422)}
    },

    // delete a friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');

            if(!user){
                return res.status(404).json(error404)
            }
            res.status(200).json(user);
        } catch(err){res.status(422).json(error422)}
    },
};