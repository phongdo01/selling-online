var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://phongadm:<password>@cluster0.yywoj.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri);


/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
  try {
    await client.connect();
    const database = client.db('selling-online');
    const collection = database.collection('product');
    const query = { price: '15000' };
    const product = await collection.findOne(query);
    console.log('product: ', product)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

module.exports = router;
