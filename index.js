const express = require("express");
const app = express();
const port = 8000;

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running express server: ${err}`);
  }
  console.log(`Successfully running express server on port: ${port}`);
});
