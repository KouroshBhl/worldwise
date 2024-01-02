import styles from './CityList.module.css';
import Cityitem from './Cityitem';
import Spinner from './Spinner';
import Message from './Message';

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message='Select the city on the map...!' />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <Cityitem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
