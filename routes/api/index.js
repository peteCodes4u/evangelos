const router = require('express').Router();

const userRoutes = require('./userRoutes');
const thougthRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thougthRoutes);
router.use('/reactions', reactionRoutes);

module.exports = router;
