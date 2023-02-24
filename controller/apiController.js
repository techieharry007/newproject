const {findUser}=require('../model/userinfo')
const {User,Profile}=require('../model/indexes')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const saltRounds = 10;
dotenv.config();
process.env.TOKEN_SECRET
async function generateAccessToken(val) {
   
   let result=await jwt.sign(val, process.env.TOKEN_SECRET);
//    console.log(result,"########################")
   return result 
  }
const getData =async (req,res)=>{
try{
    return User.create({
        firstName: req.body.name,
        lastName: req.body.lname,
        
    }).then(function (User) {
        if (User) {
            res.status(200).json({msg:"success"})
        } else {
            res.status(400).json({msg:"something went wrong"})
        }
    })
     
 
}
   catch(err){
    res.status(500).json({msg:"error found"})
   
   }
}
const getUserData = (req,res) => {
   
}

const getProfile= (req,res)=>{
    let {username,password}=req.body
    var hashedpass=null
    bcrypt.hash(password, saltRounds,async  function(err, hash) {
        if(err){
            console.log(err,"some error found")
        }
        else{
            hashedpass= await hash
            try{
                console.log("try block")
                return Profile.create({
                    username:username,
                    password:hashedpass
                }).then((Profile)=>{
                    if(Profile){
                        console.log(Profile,"################################")
                        res.status(200).json({msg:"success"})
                    }
                    else {
                        console.log("errro ################################")
                        res.status(400).json({msg:"something went wrong"})
                    }
                })
            }
            catch (err){
                console.log(err,"error found")
            }
        
        }
            console.log("has block")
    });
   
}
const correctPassword = (enteredPassword, originalPassword) => {
    return bcrypt.compare(enteredPassword, originalPassword, (err, res) =>{
        if(err) console.log(err,"Erro triggered")
      return res;
    });
  }
//   javascript

const getProfileValue=async (req,res)=>{
    let msg=""
    let acctoken=null
    try{  
let {username,password}=req.body

Profile.findOne({where:{
    username:username
}}).then((ress)=>{
    if(ress===null)
    {
       msg="no user found"
    }
    else {
        bcrypt.compare(password, ress.password, async (err, r) =>{
            if(err)
            {
                msg="some error found"
            }
            else if(r===false)
            {
                console.log("chdhsvhj")
                msg="password incorrect"
            }
            else{
                msg="token"
             let token= await  generateAccessToken(req.body.username)
                console.log(token,"@@@@@@@@@@@@@@@")
                acctoken=token
               
            }
        
        })   
    }
   
    setTimeout(() => {
        res.status(200).json({token:acctoken})
    }, 500);
 
   

 })
    }
    catch(err){
        res.status(400).json({msg:"cbdhhdshvh"})
    }

}
module.exports = {
    getData,
    getUserData,
    getProfile,
    getProfileValue
    
}