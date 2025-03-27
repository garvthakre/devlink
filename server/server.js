const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const AuthRoutes =require("../server/Routes/AuthRoutes");
const profileRoutes = require("./Routes/ProfileRoutes");
 

dotenv.config();
const app = express();
 

// Middleware (to parse JSON)
app.use(express.json());
app.use(cors());
// Define a route

app.use("/api/auth",AuthRoutes);
app.use("/api/profiles",profileRoutes);
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MONGODB connected"))
.catch((err)=>console.log(err));
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
