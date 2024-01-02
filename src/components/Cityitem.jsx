import styles from './Cityitem.module.css';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function Cityitem({ city }) {
  const { cityName, emoji, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emopji}>{emoji}</span>
      <p className={styles.name}>{cityName}</p>
      <span className={styles.date}>({formatDate(date)})</span>
    </li>
  );
}

export default Cityitem;
