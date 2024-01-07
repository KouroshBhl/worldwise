import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/UserAuthContext';
import PageNav from '../components/PageNav';
import Button from '../components/Button';
import styles from './Login.module.css';
import { useEffect, useState } from 'react';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const { userLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');

  useEffect(
    function () {
      if (isAuthenticated) navigate('/app/cities');
    },
    [isAuthenticated, navigate]
  );

  function handleLogin(e) {
    e.preventDefault();
    if (email && password) userLogin(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
