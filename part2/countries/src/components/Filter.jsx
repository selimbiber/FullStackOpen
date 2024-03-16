export default function Filter({ newFilter, handleFilterChange }) {
  return (
    <form>
      <fieldset style={{ border: 0 }}>
        <label htmlFor="search">find countries:</label>
        <input
          id="search"
          style={{ marginLeft: "10px" }}
          value={newFilter}
          onChange={handleFilterChange}
        />
      </fieldset>
    </form>
  );
}
