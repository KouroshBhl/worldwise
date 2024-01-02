import styles from './CountryList.module.css';
import CountryItem from './CountryItem';
import Spinner from './Spinner';
import Message from './Message';

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message='Select the city on the map...!' />;

  // const countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country))
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   else return arr;
  // }, []);

  const countryUnique = new Set(
    cities.map((city) =>
      JSON.stringify({ country: city.country, emoji: city.emoji })
    )
  );
  const countries = [...countryUnique].map((each) => JSON.parse(each));

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country + country.emoji} />
      ))}
    </ul>
  );
}

export default CountryList;
