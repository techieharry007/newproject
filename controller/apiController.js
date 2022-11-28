const getData = (req,res)=>{
    res.json({msg:"hello user"})
}
const getUserData = (req,res) => {
    res.json({msg:"user data"})
}
module.exports = {
    getData,
    getUserData,
    
}