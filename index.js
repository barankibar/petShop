const express = require("express");
const ejs = require("ejs");

const pageRouters = require("./routers/pageRouters");
const app = express();

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//ROUTES
app.use("/", pageRouters);

//LISTEN
const port = 8080;
app.listen(port, () => {
  console.log(`Server has started on ${port} port`);
});
