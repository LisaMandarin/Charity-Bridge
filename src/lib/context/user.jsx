import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      const loggedInUser = await account.get();
      setUser(loggedInUser);
      window.location.replace('/')
    } catch(error) {
      console.error('Login failed: ', error)
    }
  }

  async function logout() {
    try {
      await account.deleteSession('current')
      setUser(null)
    } catch (error) {
      console.error('Logout failed: ', error)
    }
  }

  async function register(email, password, username) {
    try {
      await account.create(ID.unique(), email, password, username)
      alert('You have successfully registered with Charity Bridge.\nRedirecting to the homepage.')
      await login(email, password);
    } catch (error) {
      console.error('Registration failed: ', error);
    }
  }

  async function init() {
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
}
