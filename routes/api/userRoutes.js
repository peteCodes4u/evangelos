const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,

} = require('../../controllers/userController');

// api/users get all users route
router.route('/')
    .get(getUsers)
    .post(createUser);

// api/users get user by id route
router.route('/:userId')
    .get(getOneUser);

module.exports = router;