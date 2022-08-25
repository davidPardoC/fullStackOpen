import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello FullStack!");
});

app.get("/bmi", (req, res) => {
  const { weigth, heigth } = req.query;
  res.send(calculateBmi(Number(weigth), Number(heigth)));
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
