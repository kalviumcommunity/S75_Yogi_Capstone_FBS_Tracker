const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// GET API (Required for Kalvium task)
app.get("/test", (req, res) => {
  res.json({ message: "GET API working" });
});

app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000/test`);
});
