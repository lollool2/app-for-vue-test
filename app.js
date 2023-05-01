const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const i18n = require('i18n');
const expressLayouts = require("express-ejs-layouts")
const morgan = require("morgan");
const cors = require("cors");
//settings
// or as an es module:
// import { MongoClient } from 'mongodb'

app.set("port", process.env.PORT || 9035);
//midellwares
app.set("views", path.join(__dirname, "views"));
app.engine("html",require("ejs").renderFile)
app.set("view engine", "ejs");
app.use(expressLayouts)
app.use(morgan("dev"));
app.use(cors());

const srvRenderFunctions = require(path.resolve(__dirname, 'services', 'renderfn.js'));

// Configurar i18n
i18n.configure({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  directory: __dirname + '/locales',
  objectNotation: true
});

app.use(i18n.init);

//multer and calls from json
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/csv/upload"),
  filename: (req, file, cb, filename) => {
    cb(null, file.originalname);
  },
});
app.use(multer({ storage: storage }).single("csv"));

//db
const db = require("./db");
/*
Start Config from db
*/
//

/**
 * End config db
 */

app.use((req, res, next)=>{
  res.locals.renderPartial = srvRenderFunctions.renderPartial;
  res.locals.db = db;
  next() 
});

app.use("/jquery",express.static(path.join(__dirname, "node_modules", "jquery","dist")));
app.use("/bootstrap",express.static(path.join(__dirname, "node_modules", "bootstrap","dist")));
app.use("/sweetalert",express.static(path.join(__dirname, "node_modules", "sweetalert2","dist")));
app.use("/chart.js",express.static(path.join(__dirname, "node_modules", "chart.js","dist")));
app.use("/axios",express.static(path.join(__dirname, "node_modules", "axios","dist")));
app.use("/qs",express.static(path.join(__dirname, "node_modules", "@types","timers")));
//app.use("/fontAwesome",express.static(path.join(__dirname, "node_modules","font-awesome")));
//app.use((req, res, next)=>{res.locals.db = {MongoClient, url, client,dbName},next();});

//routes
app.use(require("./routes/index.routes"));
//static
app.use(express.static(path.join(__dirname, "public")));

//404 error
app.use((req, res, next) => {
  //res.status(404).render("404.html");
  res.status(404).send("404.html");
});

module.exports = app;