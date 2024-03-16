import axios from "axios";
import { useEffect, useState } from "react";
import Content from "./components/Content";
import Filter from "./components/Filter";

export default function App() {
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (event) => {
    const newFilterValue = event.target.value;
    setNewFilter(newFilterValue);

    if (!newFilterValue) return;

    const filteredCountries = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(newFilterValue.toLowerCase())
    );

    setCountries(filteredCountries);
  };

  if (loading) return <div>loading...</div>;

  return (
    <div>
      <h1>Countries</h1>
      <Filter value={newFilter} handleFilterChange={handleFilterChange} />
      <Content countries={countries} />
    </div>
  );
}
