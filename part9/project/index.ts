import express, { json } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExcersies } from "./exerciseCalculator";

const app = express();

app.use(json());

app.get("/hello", (_req, res) => {
  res.send("Hello FullStack!");
});

app.get("/bmi", (req, res) => {
  const { weigth, heigth } = req.query;
  res.send(calculateBmi(Number(weigth), Number(heigth)));
});

app.post("/excersices", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!target || isNaN(target as number)) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }
  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }
  try {
    daily_exercises.every((item: number) => {
      if (isNaN(item)) {
        throw new Error("");
      }
      return true;
    });
  } catch (error) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  return res.json(
    calculateExcersies(daily_exercises as number[], target as number)
  );
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
