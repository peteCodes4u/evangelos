const router = require('express').Router();

const userRoutes = require('./userRoutes');
const thougthRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thougthRoutes);

module.exports = router;
