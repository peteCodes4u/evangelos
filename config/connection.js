const { connect, connection } = require('mongoose');

// Update database value when ready
const database = '';

connect(`mongodb://127.0.0.1:27017/${database}`);

module.exports = connection;
