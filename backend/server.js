require("dotenv").config();
const cors = require("cors");


const app = require("./src/app");
app.use(cors());


const PORT = 5000;
const connectDB = require("./src/config/db");

connectDB();
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});