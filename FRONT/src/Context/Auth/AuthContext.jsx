import { createContext, useReducer } from 'react';
import { authReducer } from './authReducer';
import { types } from './types/types';

export const AuthContext = createContext();

const init = () => { 
  const token = JSON.parse( localStorage.getItem('token') )
  const user = JSON.parse( localStorage.getItem('user') )

  return {
    logged: !!token,
    user: user,
  }
}

export const AuthProvider = ({ children }) => {
  const [ authState, dispatch ] = useReducer( authReducer, {}, init )

  const login = ({ token, nombre, rol }) => {
    const user = { id: 'abc', name: nombre, role: rol }
    const action = {
      type: types.login,
      payload: user
    }
    localStorage.setItem('token', JSON.stringify(token) )
    localStorage.setItem('user', JSON.stringify(user) )
    dispatch(action)
  }

  const logout = () => { 
    const action = { type: types.logout }
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(action)
  }

  return (
    <AuthContext.Provider value={{ authState, login: login, logout: logout }}>
      {children}
    </AuthContext.Provider>
  );
};
