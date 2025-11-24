// the client work is to interact with the redis server
const redis = require('ioredis');

const client = new redis();

module.exports = client;