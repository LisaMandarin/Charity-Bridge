import { ID, OAuthProvider } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [ user, setUser ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);
  const navigate = useNavigate()

  async function fetchUser() {
    try {
      const session = account.getSession('current')
      if (session) {
        const currentUser = await account.get();
        setError(null)
        setSuccess('You have logged in')
        setUser(currentUser)
      }
    } catch (error) {
      setUser(null)
      setSuccess(null)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  async function login(email, password) {
    setError(null)
    setSuccess(null)
    try {
      await account.createEmailPasswordSession(email, password);
      await fetchUser()
      setSuccess('You have logged in')
      setTimeout(() => navigate('/'), 3000)
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
    setSuccess(null)
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

  async function googleLogin () {
    setError(null)
    try {
      account.createOAuth2Session(
        OAuthProvider.Google,
        'http://localhost:5173/',
        'http://localhost:5173/failure',
      )
      setSuccess('Google Login successful')
    } catch (err) {
      setError(err)
      console.error('Fail to use Google login', err.message)
    }
  }

  return (
    <UserContext.Provider value={{ current: user, error, setError, success, setSuccess, login, logout, register, googleLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
