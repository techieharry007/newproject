// const {findUser}=require('../model/userinfo')
const { Profile,User,SerialNumber } = require("../model/indexes");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
// const { Json } = require("sequelize/types/utils");
const saltRounds = 10;
dotenv.config();
process.env.TOKEN_SECRET;
async function generateAccessToken(val) {
  let result = await jwt.sign(val, process.env.TOKEN_SECRET);
  return result;
}



const getProfileValue=async (req,res)=>{
    let msg=""
    let acctoken=null
    let {body}=req.body
    let {username,password}=body
    console.log("@@@@@@@@@@@@@@@@",username,password)
    try{
     
if(!body.username||!body.password)    {res.status(400).json({message:"Please fill required data"}) }
else
{
User.findOne({where:{
    username:body.username
}}).then(async(ress)=>{
    if(ress===null)
    {
      res.status(400).json({message:"no user found"}) 
    }
    else {

        if(!password)  res.status(400).json({message:"Enter your password"}) 
        else {

            bcrypt.compare(body.password, ress.password, async (err, r) =>{
                if(err)
                {
                    res.status(400).json({message:"somoe error found"}) 
                }
                else if(r===false)
                {
                    res.status(400).json({message:"wrong password"}) 
                }
                else{
                    
                 let token= await  generateAccessToken(req.body.body.username)
    
                 res.status(200).json({token:token})
    
                } })
        }

       
    }
 })
    }
}
    catch(err){
        console.log("##################",err)
        res.status(400).json({msg:"error found"})
    }

}
const createNewUser = async (req, res) => {
  let { username, password,phone } = req.body;
  // console.log("####################",req./body)
  const oldUser = await User.findOne({ username });
  if (oldUser) res.status(400).json({ message: "User already exist" });
  else {
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        res.status(400).json({ messgae: "Unknown error found" });
        console.log(err, "1111111111some error found");
      } else {
        hashedpass = await hash;
        try {
          console.log("try block");
          return User.create({
            username: username,
            password: hashedpass,
            phone:phone
          }).then((Profile) => {
            if (Profile) {
              console.log(Profile, "################################");
              res.status(200).json({ msg: "User created Successfully" });
            } else {
              console.log("errro ################################");
              res.status(400).json({ msg: "something went wrong" });
            }
          });
        } catch (err) {
          res.status(400).json({ messgae: "Unknown Error Found" });
          console.log(err, "error found");
        }
      }
      console.log("has block");
    });
  }
};


const demoCall=(req,res)=>{
  res.status(200).send({message:"hello"})
}
const getNewEnry =async (req, res) => {
  let {snumber,name,date}=req.body.body
  // console.log(req.body)
  // res.status(400).json({ message: "Cannot be empty" })
  if(!snumber||!name||!date) res.status(400).json({ message: "Cannot be empty" });
  const numberExist = await SerialNumber.findOne({snumber });
  // console.log("numberExist",numberExist)
  if (numberExist) res.status(400).json({ message: "serial number already exist" });
  else{
    try {
      return SerialNumber.create({
        name: name,
        serial_number:snumber,
        date:date
      }).then((Profile) => {
        if (Profile) {
          console.log(Profile, "################################");
          res.status(200).json({ msg: "Entry created Successfully" });
        } else {
          console.log("errro ################################");
          res.status(400).json({ msg: "something went wrong" });
        }
      });
    } catch (err) {
      res.status(400).json({ messgae: "Unknown Error Found" });
      console.log(err, "error found");
    }

  }

};
module.exports = {
  // getData,
  // getUserData,
  // getProfile,
  getProfileValue,
  createNewUser,
  demoCall,
  getNewEnry
};
