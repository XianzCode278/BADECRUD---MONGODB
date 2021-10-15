const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded( { extended : false } ))



const DBconfig = ' mongodb://127.0.0.1:27017' // or / tblname
const dbname = 'test'


mongoose.connect(`${DBconfig}/${dbname}` , { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
}), (err) => err ? console.log("DB Not Connected") : console.log("COnnected")


const port = 5001
console.log(DBconfig+'/'+ dbname)
app.listen(port, () =>{
    console.log("listening Port :", port)
})

var Schema = new mongoose.Schema({
        name : String,
        pass : String

})

var user = mongoose.model('tbluser', Schema)

 app.post("/create",function(req,res){
      new user({
        name: req.body.name,
        pass: req.body.pass
      }).save(function(err,doc){
        if(err) {
              res
              .json(err)
              .status(500)
        } else {  
          res
            .send ("Data Inserted !")
            .status(2021)

        }
      })

 })

 app.get("/delete/:id",function(req,res){
  user.remove({_id: req.params.id}, function(err){
    if(err){
        res
            .json(err)
            .status(500)
    } else {
      res
          .send("Data deleted")
          .status(201)
    }
  })
  })



  app.patch('/update/:id', function(req, res){
      user.updateOne({_id: req.params.id},{
        name : req.body.name,
        pass: req.body.pass}, function(err){
          if(err){
            res
            .json(err)
            .status(500)
          } else {
             res
             .send("Data Update Successfully")
             .status(201)
          }
        })
    });


    app.get('/view', function(req, res){
        user.find({}, function(err,docs){
          if(err){
            res
             .send(err)
             .status(500)
          }else {
            console.log(docs)
            res.status(201).json(docs);
          
          }
        })
    });


    app.get('/viewbyid/:id', function(req, res){
        console.log(req.params.id)
      user.find({_id: req.params.id}, function(err,docs){
        if(err){
          res
            .send(err)
            .status(500)
          // console.log(err)
        }else {
          console.log(docs)
          res
            .status(201)
            .json(docs)
        }
      })
  });

