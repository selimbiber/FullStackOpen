import { useState } from "react";

const handleSubmit = (event) => {
  event.preventDefault();
};

const handleFilterChange = (event) => {
  setNewFilter(event.target.value);
};

const Search = ({ handleSubmit, handleFilterChange, setCountries }) => {
  return (
    <form>
      <fieldset style={{ border: 0 }}>
        <label htmlFor="search">find countries:</label>
        <input id="search" style={{ marginLeft: "10px" }} onChange={handleFilterChange} />
      </fieldset>
    </form>
  );
};

const Notification = () => {
  return <p>Too many matches, specify another filter</p>;
};

const Countries = () => {};

export default function App() {
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);

  return (
    <div>
      <h1>Countries</h1>
      <Search handleSubmit={handleSubmit} setCountries={setCountries} />
      {countries.length > 10 && <Notification />}
      <Countries countries={countries} />
    </div>
  );
}
