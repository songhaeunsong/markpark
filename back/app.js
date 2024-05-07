const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const parkingRoutes = require("./routes/parkingRoutes");

const allowedOrigins = [
  "https://markpark.site",
  "http://markpark.site",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // 요청이 허용된 도메인인지 확인
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(bodyParser.json());
app.use("/api", parkingRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
