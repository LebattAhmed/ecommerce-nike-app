const { MongoClient } = require("mongodb");

const uri = "mongodb://lebatteleyouta98:Zu1wQDjMb68Ga7z2@ac-kiyzio8-shard-00-00.ecwzilo.mongodb.net:27017,ac-kiyzio8-shard-00-01.ecwzilo.mongodb.net:27017,ac-kiyzio8-shard-00-02.ecwzilo.mongodb.net:27017/?ssl=true&replicaSet=atlas-ora7s0-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri);

const database = client.db('test');
const products = database.collection('products');
const orders = database.collection('orders');

module.exports = {
    products,
    orders,
}