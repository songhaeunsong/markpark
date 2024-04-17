const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const parkingRoutes = require("./routes/parkingRoutes");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());
app.use("/api", parkingRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
