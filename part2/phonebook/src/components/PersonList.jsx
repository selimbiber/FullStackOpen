export default function PersonList(props) {
  const filteredPersons = props.filterPersons(props.persons, props.newFilter);
  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.handleDelete(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
}
