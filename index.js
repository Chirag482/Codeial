const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
app.use(express.urlencoded()); //used to read post requests

app.use(cookieParser());
//use express router
app.use("/", require("./routes"));

//setting ejs for using views files
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running express server: ${err}`);
  }
  console.log(`Successfully running express server on port: ${port}`);
});
