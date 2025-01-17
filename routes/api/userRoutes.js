const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,

} = require('../../controllers/userController');

// api/users get all users route
router.route('/')
    .get(getUsers)
    .post(createUser);

// api/users get user by id route
router.route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;