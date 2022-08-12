import React from "react";
import { useDispatch } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const onChangeFilter = (e) => {
    dispatch(changeFilter(e.target.value));
  };
  return (
    <input
      type="text"
      placeholder="Filter anecdotes"
      onChange={onChangeFilter}
    />
  );
};

export default Filter;
