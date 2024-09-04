import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";
import { Navigate } from "react-router-dom";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [ user, setUser ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);

  async function fetchUser() {
    try {
      const currentUser = await account.get();
      setError(null)
      setSuccess('You have logged in')
      setUser(currentUser)
    } catch (error) {
      // setError(error)
      console.error('Fetch error: ', error.message)
      setSuccess(null)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  async function login(email, password) {
    setError(null)
    try {
      await account.createEmailPasswordSession(email, password);
      const loggedInUser = await account.get();
      setSuccess('You have logged in')
      setUser(loggedInUser);
      Navigate('/')
    } catch(error) {
      setError(error)
      console.error('Login error: ', error.message)
    }
  }

  async function logout() {
    setError(null)
    setSuccess(null)
    try {
      await account.deleteSession('current')
      setSuccess('You have logged out.')
      setUser(null)
    } catch (error) {
      setError(error)
      console.error('Logout error: ', error.message)
    }
  }

  async function register(email, password, username) {
    setError(null)
    try {
      await account.create(ID.unique(), email, password, username)
      setSuccess('You have successfully registered with Charity Bridge.\nLogging in...')
      setTimeout(async() => {
        await login(email, password)
      }, 3000)
    } catch (error) {
      setError(error)
      console.error('Register error: ', error.message)
    }
  }

  return (
    <UserContext.Provider value={{ current: user, error, setError, success, setSuccess, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
}
