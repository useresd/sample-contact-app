const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/?retryWrites=true&w=majority`;

module.exports = new MongoClient(uri);