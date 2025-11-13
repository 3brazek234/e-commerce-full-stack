const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db")
const auth = require("./routes/authRoutes");
const order = require("./routes/orderRoutes");
const upload = require("./routes/uploadRoutes");
app.use(express.json());
app.use(cors());
connectDB();
app.use(morgan("dev"));
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api", require("./routes/productRoutes"));   
app.use("/api", auth);
app.use("/api", order);
app.use("/api", upload);
const port = process.env.PORT || 3001; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
