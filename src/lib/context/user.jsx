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
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);
  const navigate = useNavigate()

  async function fetchUser() {
    setLoading(true)
    try {
      const session = await account.getSession('current')
      if (session) {
        try {
          const currentUser = await account.get();
          console.log('currentUser: ', currentUser)
          setLoading(false)
          setError(null)
          setSuccess(null)
          setUser(currentUser)
        } catch (err) {
          console.error("Can't get account")
        }
      }
    } catch (error) {
      setLoading(false)
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
        // 'http://localhost:5173/',
        // 'http://localhost:5173/failure',
        'https://main--charitybridge.netlify.app/',
        'https://main--charitybridge.netlify.app/failure',
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
      setUser(result)
    } catch (err) {
      console.error('Failed to update preferences: ', err.message)
      setError('Failed to update preferences')
    }
  }

  async function emailVerification() {
    setError(null)
    setSuccess(null)
    try {
      await account.createVerification(
        'https://main--charitybridge.netlify.app/verification'
      )
      setSuccess('Verification email sent!')
    } catch (err) {
      console.error('Failed to send email verification: ', err.message)
      setError('Failed to send email verification')
    }
  }

  async function passwordRecovery(email) {
    setError(null)
    setSuccess(null)
    try {
      await account.createRecovery(
        email,
        'https://main--charitybridge.netlify.app/passwordrecovery'
      )
      setSuccess('Password recovery sent')
    } catch (err) {
      console.error('Failed to send password recovery')
      setError('Failed to send password recovery')
    }
    
    }

  return (
    <UserContext.Provider value={{ current: user, loading, error, setError, success, setSuccess, login, logout, register, updateName, updatePassword, googleLogin, updatePrefs, emailVerification, passwordRecovery }}>
      {props.children}
    </UserContext.Provider>
  );
}
