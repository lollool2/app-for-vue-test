const app = require("./app");
const https = require('http');
const fs = require("fs");
//const { exec } = require("node:child_process")

// verficar http o https
const server = https.createServer(
  {
    key: fs.readFileSync(__dirname + "/ssl2/server.key"),
    cert: fs.readFileSync(__dirname + "/ssl2/server.cer"),
    //ca: fs.readFileSync(__dirname + "/ssl2/server.crt")
  },
  app
)
  .listen(app.get("port"), function () {
    console.log(`server on port  https://localhost:${app.get("port")}`);
  });