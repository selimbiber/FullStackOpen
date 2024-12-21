export default function PersonForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        Name:{" "}
        <input
          value={props.newName}
          onChange={props.handleNameChange}
          minLength="3"
          required
        />
      </div>
      <div>
        Number:
        <input
          type="tel"
          pattern="(0[0-9]{1,2}-[0-9]{6,8})"
          value={props.newNumber}
          onChange={props.handleNumberChange}
          required
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
