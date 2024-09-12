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
        setSuccess(null)
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
      setError('Failed to login')
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
      setError('Failed to logout')
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
      setError('Failed to register')
      console.error('Register error: ', error.message)
    }
  }

  async function updateName(name) {
    setError(null)
    setSuccess(null)
    try {
      await account.updateName(name)
      setSuccess("User's name updated successfully")
      fetchUser()
    } catch (err) {
      console.error("Failed to update user's name: ", err.message)
      setError("Failed to update user's name")
    }
  }

  async function updatePassword(newPassword, oldPassword) {
    setError(null)
    setSuccess(null)
    try {
      await account.updatePassword(
        newPassword,
        oldPassword
      )
      setSuccess('Password updated successfully')
    } catch (err) {
      setError('Failed to update password')
      console.error('Failed to update password: ', err.message)
    }
  }

  async function googleLogin () {
    setError(null)
    setSuccess(null)
    try {
      account.createOAuth2Session(
        OAuthProvider.Google,
        'http://localhost:5173/',
        'http://localhost:5173/failure',
      )
      setSuccess('Google Login successful')
    } catch (err) {
      setError('Failed to use Google login')
      console.error('Fail to use Google login', err.message)
    }
  }

  async function updatePrefs(key, value) {
    setError(null)
    setSuccess(null)
    try {
      const result = await account.updatePrefs(
        {
          [key]: value
        }
      )
    } catch (err) {
      console.error('Failed to update preferences: ', err.message)
      setError('Failed to update preferences')
    }
  }

  return (
    <UserContext.Provider value={{ current: user, error, setError, success, setSuccess, login, logout, register, updateName, updatePassword, googleLogin, updatePrefs }}>
      {props.children}
    </UserContext.Provider>
  );
}
