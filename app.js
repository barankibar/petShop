const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const pageRouters = require("./routers/pageRouters");
const productRouters = require("./routers/productRouters");
const dbConfig = require("./config/db");

//INSTANCE OF APP
const app = express();
const corsOptions = {
  origin: "http://localhost:8080",
};

//DB CONNECTION
mongoose
  .connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => console.error(err.stack));

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(fileUpload());

//ROUTES
app.use("/", pageRouters);
app.use("/product", productRouters);

//LISTEN
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Running at ${port} port`);
});
