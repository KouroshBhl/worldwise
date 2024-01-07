// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';
import { useUrlPosition } from '../hooks/useUrlPosition';
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from '../Contexts/CitiesContext';
import { useNavigate } from 'react-router-dom';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const navigate = useNavigate();
  const { isLoading } = useCities();
  const { createCity } = useCities();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [lat, lng] = useUrlPosition();
  const [emoji, setEmoji] = useState('');
  const [isLoadingData, setisLoadingData] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function getCityDetails() {
        try {
          setisLoadingData(true);
          setError('');
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error('Please click somewhere else ...!');

          setCityName(data.city || data.locality || '');
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
          console.log(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setisLoadingData(false);
        }
      }
      getCityDetails();
    },
    [lat, lng]
  );

  async function handleSubmitCity(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: {
        lat,
        lng,
      },
    };

    await createCity(newCity);
    navigate('/app/cities');
  }

  if (isLoadingData) return <Spinner />;

  if (error) return <Message message={error} />;

  if (!lat && !lng) return <Message message='Start by clicking on the map!' />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmitCity}
    >
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>

        <DatePicker
          id='date'
          onChange={(date) => setDate(date)}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
