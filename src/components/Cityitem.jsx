import { Link } from 'react-router-dom';
import styles from './Cityitem.module.css';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function Cityitem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emopji}>{emoji}</span>
        <p className={styles.name}>{cityName}</p>
        <span className={styles.date}>({formatDate(date)})</span>
      </Link>
    </li>
  );
}

export default Cityitem;
