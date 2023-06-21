const express = require("express");
const dbConnect = require("./config/dbConnect");
const { router, auth, category, product } = require("./src/routes/index");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;
dbConnect();
app.use(express.json());
app.use(router);
app.use(auth);
app.use(category);
app.use(product);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
