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
    // const loggedIn = await account.createEmailPasswordSession(email, password);
    // setUser(loggedIn);
    // window.location.replace("http://www.amazon.com"); // you can use different redirect method for your application
  }

  async function logout() {
    try {
      await account.deleteSession('current')
      setUser(null)
    } catch (error) {
      console.error('Logout failed: ', error)
    }
    // await account.deleteSession("current");
    // setUser(null);
  }

  async function register(email, password) {
    try {
      await account.create(ID.unique(), email, password)
      alert('You have successfully registered with Charity Bridge.\nRedirecting to the homepage.')
      await login(email, password);
    } catch (error) {
      console.error('Registration failed: ', error);
    }

    // await account.create(ID.unique(), email, password);
    // await login(email, password);
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
