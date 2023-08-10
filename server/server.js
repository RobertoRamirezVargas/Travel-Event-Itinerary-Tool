const express = require("express");
const app = express();
const PORT = 8000;

app.use(require("./routes"));

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
