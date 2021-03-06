const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
//for database mongodb
const db = require("./config/mongoose");
//for session cookies
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const MongoStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const customMware = require("./config/middleware");

app.use(express.urlencoded()); //used to read post requests

app.use(cookieParser());
app.use(express.static("./assets"));
//make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
//setting ejs for using views files
app.set("view engine", "ejs");
app.set("views", "./views");

//Mongo store is used to store the session in the db
app.use(
  session({
    name: "codeial",
    //todo change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "Connect-mongo setup ok");
        return;
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running express server: ${err}`);
  }
  console.log(`Successfully running express server on port: ${port}`);
});
