const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
   res.send("Server Online");
});

app.listen(PORT, () => {
   console.log(`Server Running on http://localhost:${PORT}`);
});
