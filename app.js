const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const pageRouters = require("./routers/pageRouters");
const productRouters = require("./routers/productRouters");
const userRouters = require("./routers/userRouters");
const dbConfig = require("./config/db");

//INSTANCE OF APP
const app = express();
const corsOptions = {
  origin: "http://localhost:8080",
};
dotenv.config();

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
app.use("/user", userRouters);

//LISTEN
if (process.env.NODE_ENV === "development") {
  const port = 8080;

  app.listen(port, () => {
    console.log(`Running at ${port} port`);
  });
} else {
  const port = process.env.SERVER_PORT;

  app.listen(port, () => {
    console.log(`Running at ${port} port`);
  });
}
