const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err){
            res.status(500).json(err);
        }
    },
    // get single user
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if (!user) {
                return res.status(404).json({message: 'Sorry, that user is not found in our records, please try again.'});
            }

            res.json(user);
        } catch (err) {
            res.status(422).json(err);
        }
    },

    // create a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(422).json(err);
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
                return res.status(404).json({message: 'Sorry there are no users with this id in our records'})
            }
            res.json(user);

        } catch (err) {res.status(422).json(err);}
    },

    // delete a user 
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.userId },
            );
            if(!user) {
                return res.status(404).json({message: 'sorry there is no user with this id in our records, please check the Id you have supplied and try again'})
            }

            await Thought.deleteMany({ username: user.username });
            res.status(200).json({message: 'The user has been successfully deleted, along with thier associated thought records'})
        } catch(err){res.status(422).json(err)}
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
                return res.status(404).json({message: 'sorry, there are no users associated with the Id supplied, please check the id and try again'})
            }
            res.status(200).json(user);
        } catch(err){res.status(422).json(err)}
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
                return res.status(404).json({message: 'sorry, there are no users associated with the Id supplied, please check the id and try again'})
            }
            res.status(200).json(user);
        } catch(err){res.status(422).json(err)}
    },
};