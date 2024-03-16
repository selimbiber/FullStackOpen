export default function CountryInfo({ country, isShowing }) {
  return (
    <>
      <article>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
      </article>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((languageKey) => (
          <li key={languageKey}>{languageKey}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
    </>
  );
}
