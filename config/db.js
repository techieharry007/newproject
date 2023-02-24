const { Sequelize, DataTypes } = require('sequelize');
// function Connection(){
const user="postgres"
const host="localhost"
const database="harry"
const password="12345"
const port =5432
const sequelize = new Sequelize(database,user,password,{
    host,
    port,
    dialect:'postgres'
} 
)
try {
     sequelize.authenticate()

        console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  // sequelize.sync()

module.exports={sequelize}
