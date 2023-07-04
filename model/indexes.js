const {sequelize}=require('../config/db')
const {DataTypes } = require('sequelize');

  const Profile = sequelize.define('Profile', {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false

    },
    password: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    phone:DataTypes.NUMBER
  }, {
    // Other model options go here
  });
  const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/ 

  const User = sequelize.define('User', {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false

    },
    password: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
  phone:  {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        validator: function(v) {
            return phoneValidationRegex.test(v); 
        },
    }
    }
  }
    // Other model options go here
);
const SerialNumber = sequelize.define('SerialNumber', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false

  },
  serial_number: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
date:  {
  type: DataTypes.STRING,
  allowNull: false,
 
  }
}
  // Other model options go here
);

  
 Profile.sync()
 User.sync()
 SerialNumber.sync()
 module.exports={Profile,User,SerialNumber}
