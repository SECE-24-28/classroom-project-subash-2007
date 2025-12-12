const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const productRoutes = require("./src/routes/productRoutes");
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API running. Try GET /products or POST /products");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



