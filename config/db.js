const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`,
  database: `${process.env.DB_DATABASE}`,
  imgBucket: "upload",
};
