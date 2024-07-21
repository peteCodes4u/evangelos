const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    return res.status(500).json({ message: '💀 Something went wrong! we apologize for the inconvience, however if you are seeing this message there is an issue with the parameters or body for the request you are attempting, please double check the data supplied in those areas and try again.' });
});

module.exports = router;