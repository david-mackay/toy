const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://unitedplastics_admin:unitedplastics_admin123@cluster0.axuj9.mongodb.net/Maintenance?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    if (err) return console.log(err)
    console.log("Booyah")
    const collection = client.db("Maintenance").collection("machines")
    app.listen(3001, function() {
        console.log('listening on 3001')
      })
    
    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(pino);
    // All your handlers here...
    app.get('/api/greeting', (req, res) => {
        const name = req.query.name || 'World';
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
      });

    app.post('/action', (req, res) => {
    console.log(req.body)
    let d = req.body;
    for (let pair of d.entries()){
        console.log(pair[0], pair[1])
    }
        // collection.insertOne(req.body)
        // .then(result=>{
        //     console.log(result)
        // })
        // .catch(error => console.log(error))
      })
  // perform actions on the collection object
//   client.close();
});

const app = express()
