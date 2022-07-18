import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      setIsLoading(false);
    });
  }, []);

  const handleInputChange = (event) => {
    setCountry(event.target.value);
    getFilteredCountries(event.target.value);
  };

  const getFilteredCountries = (country) => {
    if (country) {
      const filtered = countries.filter(({ name: { common } }) =>
        common.toLowerCase().includes(country)
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  return !isLoading ? (
    <div>
      find countries
      <input value={country} onChange={handleInputChange} type="text" />
      <ul>
        {filteredCountries.length === 1 ? (
          <Country country={filteredCountries[0]} />
        ) : filteredCountries.length > 10 ? (
          <p>Too many countries, specify filter </p>
        ) : (
          filteredCountries.map((country) => {
            return <li key={country.name.common}>{country.name.common}</li>;
          })
        )}
      </ul>
    </div>
  ) : (
    <p>Loading..</p>
  );
}

export default App;
