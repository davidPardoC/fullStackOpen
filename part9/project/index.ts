import express from "express";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello FullStack!");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
