import { ID, OAuthProvider } from "appwrite";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
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
  const [ isSession, setIsSession ] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchSession()
  }, [])

  async function fetchSession() {
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const session = await account.getSession('current')
      if (session?.$id) {
        setIsSession(true)
        const result = await fetchUser()
        if (!result) {
          setError('Failed to fetch account data')
        }
      }

    } catch (error) {
      console.error('Failed to fetch current session: ', error.message)
      setIsSession(false)

    } finally {
      setLoading(false)
    }
  }

  async function fetchUser() {
    setError(null)
    setSuccess(null)

    try {
      const result = await account.get()
      if (result?.$id) {
        setUser(result)
        return result
      }

    } catch (error) {
      console.error('Failed to fetch user: ', error.message)
      setUser(null)
      return null
    }
  }
  
  async function login(email, password) {
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const session = await account.createEmailPasswordSession(email, password);
      
      if (!session?.$id) {
        setError("Invalid session data")
        return
      }

      setIsSession(true)

      const result = await fetchUser()
      
      if (!result) {
        setError('Failed to fetch account data')
        return
      }

      setSuccess('You have logged in')
      setTimeout(() => navigate('/'), 3000)
      
    } catch(error) {
      setError('Failed to login')
      console.error('Login error: ', error.message)

    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      await account.deleteSession('current')
      setUser(null)
      setIsSession(false)
      setSuccess('You have logged out.')

    } catch (error) {
      setError('Failed to logout')
      console.error('Logout error: ', error.message)

    } finally {
      setLoading(false)
    }
  }
  
  async function register(email, password, username) {
    setError(null)
    setSuccess(null)
    setLoading(true)
    
    try {
      const result = await account.create(ID.unique(), email, password, username)
      
      if (!result?.$id) {
        setError('Unable to register')
        return
      }
      
      setSuccess('You have successfully registered with Charity Bridge.\nLogging in...')
      
      await login(email, password)
      

    } catch (error) {
      setError('Failed to register')
      console.error('Register error: ', error.message)

    } finally {
      setLoading(false)
    }
  }

  async function updateName(name) {
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      await account.updateName(name)
      setUser(prev => ({...prev, name: name}))
      setSuccess("User's name updated successfully")

    } catch (error) {
      console.error("Failed to update user's name: ", error.message)
      setError("Failed to update user's name")

    } finally {
      setLoading(false)
    }
  }

  async function updatePassword(newPassword, oldPassword) {
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      await account.updatePassword(
        newPassword,
        oldPassword
      )
      setSuccess('Password updated successfully')

    } catch (error) {
      setError('Failed to update password')
      console.error('Failed to update password: ', error.message)
      
    } finally {
      setLoading(false)
    }
  }

  async function googleLogin () {
    setError(null)
    setSuccess(null)
    setLoading(true)

    const redirectURL = window.location.hostname === 'localhost'
      ? 'http://localhost:5173/oauthsuccess' : 'https://main--charitybridge.netlify.app/';
    
    const failURL = window.location.hostname === 'localhost'
      ? 'http://localhost:5173/oauthfailure' : 'https://main--charitybridge.netlify.app/oauthfailure'
    try {
      account.createOAuth2Session(
        OAuthProvider.Google,
        redirectURL,
        failURL
      )
      setSuccess('Google Login successful')
    } catch (err) {
      setError('Failed to use Google login')
      console.error('Fail to use Google login', err.message)
    } finally {
      setLoading(false)
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
    <UserContext.Provider value={{ current: user, isSession, loading, error, setError, success, setSuccess, fetchSession, fetchUser, login, logout, register, updateName, updatePassword, googleLogin, updatePrefs, emailVerification, passwordRecovery }}>
      {props.children}
    </UserContext.Provider>
  );
}
