import React, { useState } from "react";

const Filter = ({ onChange }) => {
  const [filter, setFilter] = useState("");

  const onChangeFilter = (event) => {
    onChange(event.target.value);
    setFilter(event.target.value);
  };
  return (
    <div>
      filter show with{" "}
      <input type="text" value={filter} onChange={onChangeFilter} />
    </div>
  );
};

export default Filter;
