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
};