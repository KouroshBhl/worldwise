import { createContext, useContext, useReducer } from 'react';

const UserAuth = createContext();

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'user/login':
      return { ...state, user: action.payload, isAuthenticated: true };

    case 'user/logout':
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error('Unknow action type!');
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function userLogin(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: 'user/login', payload: FAKE_USER });
  }

  function userLogout() {
    dispatch({ type: 'user/logout' });
  }

  return (
    <UserAuth.Provider value={{ user, isAuthenticated, userLogin, userLogout }}>
      {children}
    </UserAuth.Provider>
  );
}

function useAuth() {
  const context = useContext(UserAuth);
  if (context === undefined)
    throw new Error('Using provider outside of context');
  return context;
}

export { AuthProvider, useAuth };
