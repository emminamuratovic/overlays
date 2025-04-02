const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const promptRoutes = require("./routes/promptRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", promptRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});