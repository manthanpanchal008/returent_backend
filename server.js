require("dotenv").config();

const app = require("./src/app");
const dbconnect = require("./src/db/db");

const PORT = process.env.PORT || 3000;

dbconnect();
console.log("Starting server...");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});