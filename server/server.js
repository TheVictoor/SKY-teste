const config = require('./../config/config');
const restify = require('restify');
const mongoose = require("mongoose");

const server = restify.createServer();

mongoose.connect(config.connectionString, { useUnifiedTopology: true, useNewUrlParser: true });

server.listen(8080, function () {
  console.log('running at %s: ', server.url);
});

module.exports = server;