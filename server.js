const app = require('./src/app');
const dotenv = require('dotenv');
const dbconnect = require('./src/db/db');

const cors = require("cors");

app.use(cors({
  origin: "*",
  credentials: true
}));

dotenv.config();
dbconnect();
const PORT = process.env.PORT || 5000;
try {
app.listen(PORT,()=> {console.log(`server is running on port ${PORT}`)})
    
} catch (error) {
    console.log("error",error)
}