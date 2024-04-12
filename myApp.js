let express = require('express');
require('dotenv').config()
let bodyParser = require('body-parser')
let app = express();
const staticPath = __dirname + "/public"

app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req,res,next){
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})
app.use("/public",express.static(staticPath))
app.get("/",function(req,res){
    //res.send('Hello Express');
    const file = __dirname + "/views/index.html"
    res.sendFile(file)
})

app.get("/json",function(req,res){
   
    if(process.env.MESSAGE_STYLE == "uppercase"){
        res.json({"message": "HELLO JSON"})
       // return
    }
    res.json({"message": "Hello json"})
})

app.get('/now',function(req,res,next){
    req.time = new Date().toString()
    next();
},function(req,res){
    res.json({time: req.time})
})

app.get('/:word/echo',function(req,res){
    res.json({echo: req.params.word})
})

const handler = function(req,res){
    //?first=firstname&last=lastname
    if(req.body){
        res.json({ name: `${req.body.first} ${req.body.last}`})
    }
    res.json({ name: `${req.query.first} ${req.query.last}`})
}
app.route('/name').get(handler).post(handler)

app.route('/library').get(handler).post(handler)

 module.exports = app;
