const express =require('express');
const mongoose  = require('mongoose');
const app=express();
const port =5000;
var cors = require('cors')


app.use(cors())


const itemkidsRoute=require('./routes/api-itemKids')
const itemMenRoute=require('./routes/api-itemMen')
const itemWomenRoute=require('./routes/api-itemWomen')
const usersRoutes=require('./routes/api-users')
const currentRoutes=require('./routes/api-currentHistory')


require('dotenv').config();
const bodyParser=require('body-parser')
mongoose.Promise=global.Promise;


mongoose.connect(process.env.DB,{useNewUrlParser : true})
.then(()=>console.log("conected to database"))
.catch((err)=> console.log(err))

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.use(cors())
  app.use(bodyParser.json());
  



app.use('/api-currentHistory',currentRoutes)
app.use('/api-itemKids',itemkidsRoute)
app.use('/api-itemWomen',itemWomenRoute)
app.use('/api-itemMen',itemMenRoute)
app.use('/api-users',usersRoutes)
app.use((err,req,res,next)=>{
    console.log(err)
    next();
})










app.listen(port,()=>{
console.log("server is runing on port " + port)



})


