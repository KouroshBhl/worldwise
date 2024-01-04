import styles from './CityList.module.css';
import Cityitem from './Cityitem';
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from '../Contexts/CitiesContext';

function CityList() {
  const { cities, isLoading } = useCities();

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
