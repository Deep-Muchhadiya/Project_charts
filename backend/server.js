const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

// Sample API for chart data
app.get("/api/users", (req, res) => {
  res.json([
    { label: "India", value: 1200 },
    { label: "USA", value: 900 },
    { label: "UK", value: 400 },
    { label: "Canada", value: 300 },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});