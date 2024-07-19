const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,

} = require('../../controllers/userController');

// get all users route
router.route('/')
    .get(getUsers)
    .post(createUser);

// get user by id route
router.route('/:userId')
    .get(getOneUser);

module.exports = router;