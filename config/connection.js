const { connect, connection } = require('mongoose');
require("dotenv").config();

const database = process.env.MONGOURI;

connect(database);

module.exports = connection;
