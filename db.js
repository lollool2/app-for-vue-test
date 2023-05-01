const config = {
  user: "",
  password: "",
  server: "127.0.0.1", // replace this with your IP Server
  database: "MENV",
  port: 27017, // this is optional, by default takes the port 1433
  /*options: {
    encrypt: true, // this is optional, by default is false
    enableArithAbort: true,
    trustServerCertificate: true
  },*/
};

const mongoose = require('mongoose');

const server = `${config.server}:${config.port}`
//*if is mongo
var user = ``
if (config.user.length > 0 && config.password.length > 0) {
  user = `${config.user}:${config.password}@`
}

const URI = `mongodb://${user}${server}/${config.database}`

mongoose.set("strictQuery", false);

mongoose.connect(URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = {db}