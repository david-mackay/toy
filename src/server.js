const express = require('express')
const bodyParser= require('body-parser')
const cors = require('cors')
const jsonParser = bodyParser.json()
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://unitedplastics_admin:unitedplastics_admin123@cluster0.axuj9.mongodb.net/Maintenance?retryWrites=true&w=majority";
const databaseName = "Maintenance"
const options = { useNewUrlParser: true, useUnifiedTopology: true, dbName: databaseName }
mongoose.connect(uri, options )
        .then(console.log("Connected"))
        .catch((err) => console.log('Error: ${err}'));
const db = mongoose.connection; 


const MachineSchema = new mongoose.Schema({
  name : String,
  part1: Date,
  part2: Date,
  part3: Date,
  part4: Date,
  part5: Date,
  notes: String,
})

const Maintenance = mongoose.model("Machine", MachineSchema)

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(5000, function() {
    console.log('listening on 5000')
  })

// Make sure you place body-parser before your CRUD handlers!



// All your handlers here...
app.get('/', function (req, res) {
  res.sendFile('./index.html')
})
app.post('/form', jsonParser, (req, res) =>{
  Maintenance.findOne({name: req.body.name}).then((machine)=>{
    console.log(req.body, machine)
    res.send(machine)
  });
})


app.post('/submit', jsonParser, (req, res) => {
  
  console.log(req.body);
  let d = req.body;
  Maintenance.findOne({name: d.name}).then((machine)=>{
    for (let val in d){
        if (d[val] == true){
          console.log('true')
          machine[val] = d.date_maintained
        }
    
    }
    if (d["notes"] !== ''){
      machine["notes"] = d.notes
    }
    machine.save()
    res.send("Machine Updated")
  });
})




