import React from "react";

const Country = ({ country }) => {
  const { capital, area, languages, flags, name } = country;
  return (
    <div>
      <h2>{name.common}</h2>
      <p>capital {capital[0]}</p>
      <p>area {area}</p>
      <h3>languajes: </h3>
      <ul>
        {Object.values(languages).map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <img src={flags.png} alt="" />
    </div>
  );
};

export default Country;
