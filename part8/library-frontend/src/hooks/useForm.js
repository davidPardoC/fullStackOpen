import { useState } from "react";

export const useForm = (initialState) => {
  const newState = { ...initialState };
  const [state, setState] = useState(newState);

  const onChange = (e) => {
    const newState = { ...state };
    newState[e.target.name].value = e.target.value;
    setState(newState);
  };
  return { ...state, onChange };
};
