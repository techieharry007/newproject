const {sequelize}=require('../config/db')
const {DataTypes } = require('sequelize');
const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });
  const Profile = sequelize.define('Profile', {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false

    },
    password: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });
 User.sync()
 Profile.sync()
 module.exports={User,Profile}
