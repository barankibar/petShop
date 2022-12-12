const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const path = require("path");

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
let sess = {
  secret: "keyboard car",
  cookie: {},
  resave: false,
  saveUninitialized: false,
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
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(cors(corsOptions));
app.use(bodyParser.json());
if (app.get("env") === "production") {
  app.set("trusty proxy", 1);
  sess.cookie.secure = true;
}
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());
require("./config/passport-config");
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

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

  sess.app.listen(port, () => {
    console.log(`Running at ${port} port`);
  });
}
