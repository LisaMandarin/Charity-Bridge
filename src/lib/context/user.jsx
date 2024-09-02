import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [ user, setUser ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);

  async function fetchUser(email, password) {
    try {
      const currentUser = await account.get();
      setError(null)
      setSuccess(`You have logged in(f)`)
      setUser(currentUser)
    } catch (error) {
      setError(error.message)
      setSuccess(null)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      const loggedInUser = await account.get();
      setSuccess('You have logged in(l)')
      setError(null)
      setUser(loggedInUser);
      window.location.replace('/')
    } catch(error) {
      console.error('Login failed: ', error)
      setError(error)
    }
  }

  async function logout() {
    try {
      await account.deleteSession('current')
      setSuccess('You have logged out.')
      setUser(null)
    } catch (error) {
      console.error('Logout failed: ', error)
      setError(error)
    }
  }

  async function register(email, password, username) {
    try {
      await account.create(ID.unique(), email, password, username)
      // alert()
      setError(null)
      setSuccess('You have successfully registered with Charity Bridge.\nRedirecting to the homepage.')
      setTimeout(async() => {
        await login(email, password)
      }, 3000)
    } catch (error) {
      console.error('Registration failed: ', error);
      setError(error)
    }
  }

  return (
    <UserContext.Provider value={{ current: user, error, setError, success, setSuccess, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
}
