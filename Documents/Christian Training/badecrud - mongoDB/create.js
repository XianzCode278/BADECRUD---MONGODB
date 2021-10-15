const {  Pool } = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const encoder = bodyParser.urlencoded()

const app = express()
app.use("/assets", express.static("assets"))
app.use(express.json())
//app.use(bodyParser.json())



app.listen(5001, () =>{
    console.log("Server Lsitening on Port: 5001")
})


const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'postgres',
  
  })

 pool.connect(function(error){

       if(error) throw error
       else console.log("DATABASE CONNECTED") 
 })

 app.get("/create",function(req,res){
     res.sendFile(__dirname + "/index.html")
 })

 pool.connect()
 app.post("/create",encoder,function(req,res){
   
    var uname  = '\'' + req.body.uname +'\''
     var upass = '\'' + req.body.upass + '\''
    console.log('Select * from "TBLUser" where name = '+ uname + ' and pass = ' + upass)
    pool.query('Select * from "TBLUser" where name = '+ uname + ' and pass = ' + upass, function(err,result){
        if(result.rows.length > 0){
            res.redirect("/home")
            // console.log(result.rows);
            console.log("data found!")
           }
           else{   
            res.redirect("/")     
               console.log("not connected")
           }
           console.log(result.rows.length)
           res.end();
    })

 })


 //when login successful
 app.get("/home",function(req,res){{
     res.sendFile(__dirname + "/home.html")
 }})
