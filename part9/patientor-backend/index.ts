import express from "express";
const app = express();
const PORT = 3001;
import cors from "cors";

app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
