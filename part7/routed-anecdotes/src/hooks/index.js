import { useState } from "react";

/**
 *
 * @param {string} type input html type
 * @returns
 */
export const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue("");
  };
  return { input: { type, value, onChange }, reset };
};
