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
  return { type, value, onChange };
};
