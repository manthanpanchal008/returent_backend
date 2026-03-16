require("dotenv").config();

const app = require("./src/app");
const dbconnect = require("./src/db/db");

const PORT = process.env.PORT || 5000;

dbconnect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});