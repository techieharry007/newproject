const {DataTypes} =require('sequelize')
const sequelize=require('../config/db')
const stock=sequelize.define('stock',{
    companyname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.INTEGER,
    },
    quantity:{
        type:DataTypes.INTEGER,
    },

},
    {
    sequelize,
    modelName:"stocks"
    }
)
module.exports=stock