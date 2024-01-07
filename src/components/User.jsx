import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/UserAuthContext';
import styles from './User.module.css';

function User() {
  const { user, userLogout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    userLogout();
    navigate('/');
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
