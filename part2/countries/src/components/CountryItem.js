import React, { useState } from "react";
import Country from "./Country";

const CountryItem = ({ country }) => {
  const [show, setShow] = useState(false);
  const { name } = country;
  return (
    <li>
      {name.common}{" "}
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? "hide" : "show"}
      </button>
      {show && <Country country={country} />}
    </li>
  );
};

export default CountryItem;
