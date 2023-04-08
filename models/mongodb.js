const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(process.env.dburl)
const accCollection = client.db(process.env.dbname).collection('todo')

module.exports = { accCollection, client }