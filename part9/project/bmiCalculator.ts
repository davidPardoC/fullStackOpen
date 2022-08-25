/**
 *
 * @param weigth in kg
 * @param heigth in cm
 * @returns the calculated bmi
 */
const calculateBmi = (weigth: number, heigth: number): string => {
  const heigthInMeters = heigth / 100;
  const bmi = weigth / (heigthInMeters * heigthInMeters);
  let interpretation = "Normal";
  if (bmi < 18.5) {
    interpretation = "Below normal weigth";
  } else if (bmi >= 18.5 && bmi < 25) {
    interpretation = "Normal weigth";
  } else if (bmi >= 25 && bmi < 30) {
    interpretation = "Overweigth";
  } else if (bmi >= 30 && bmi < 35) {
    interpretation = "Class I Obesity";
  } else if (bmi >= 35 && bmi < 40) {
    interpretation = "Class II Obesity";
  } else if (bmi >= 40) {
    interpretation = "Class III Obesity";
  }
  return `${interpretation} ${bmi}`;
};

console.log(calculateBmi(85, 172));
