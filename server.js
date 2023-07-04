require('dotenv').config()
const express = require('express')
require('./config/db.js')
require('./model/indexes.js')

const app = express()
const cors=require('cors')
const router=require('./routes/index')
// const jwt=require('') 
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET
function generateAccessToken(username) {
return jwt.sign(username, process.env.TOKEN_SECRET);
// console.log(tk)
  }
  const bodyparser = require('body-parser')
var corsOptions = {
  origin: 'https://localhost:8081',
  optionsSuccessStatus: 200 
}
const port = 8000
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors({
  origin: 'https://192.168.144.197:8081',
  methods: ['GET', 'POST', 'PUT']
}));
app.use(express.json())
// generateAccessToken('harry')
// app.post('/',(req,res)=>{
//   // console.log('harry####################')
//   let {username,password}=req.body
//  let token= generateAccessToken(username)
//   console.log(username,"###################################")
//     res.status(200).json({token_key:token})

// })

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
// console.log('auth triggered#####################')
// console.log(token)
  
// }
// app.post('/token',(req,res)=>{
//   console.log("auth token triggered")
  
//   try{
//     console.log(req.body)
//     const decode = jwt.verify(req.body.token_key,process.env.TOKEN_SECRET);
//     console.log(decode,"value of decode")
//     if(decode)
//    {
//     res.status(200).json({msg:'success when decode found'})
//    }
//    else{
//     res.status(500).json({msg:'not found'})
//    }
   
//   }
//  catch(err){
//   res.status(400).json({msg:'failed'})
//   console.log('error found in response',err)
//  }

// })

app.use('/api',router)
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})