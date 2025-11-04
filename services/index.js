const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 3001; // (بنضيف 3001 كقيمة بديلة)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
