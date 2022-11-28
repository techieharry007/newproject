const sequelize = require("../config/db");
const user = require("./userinfo");

sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err, "above error encountered");
  });
