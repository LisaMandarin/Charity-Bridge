import { ID, OAuthProvider } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSession, setIsSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSession();
  }, []);

  async function fetchSession() {
    setLoading(true);

    try {
      const session = await account.getSession("current");
      if (session?.$id) {
        setIsSession(true);
        const result = await fetchUser();
        if (!result) {
          message.error("Failed to fetch account data");
        }
      }
    } catch (error) {
      console.error("Failed to fetch current session: ", error.message);
      setIsSession(false);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const result = await account.get();
      if (result?.$id) {
        setUser(result);
        return result;
      }
    } catch (error) {
      console.error("Failed to fetch user: ", error.message);
      setUser(null);
      return null;
    }
  }

  async function login(email, password) {
    setLoading(true);

    try {
      const session = await account.createEmailPasswordSession(email, password);

      if (!session?.$id) {
        message.error("Invalid session data");
        return;
      }

      setIsSession(true);

      const result = await fetchUser();

      if (!result) {
        message.error("Failed to fetch account data");
        return;
      }

      message.success("You have logged in");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      message.error("Failed to login");
      console.error("Login error: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);

    try {
      await account.deleteSession("current");
      setUser(null);
      setIsSession(false);
      message.success("You have logged out.");
    } catch (error) {
      message.error("Failed to logout");
      console.error("Logout error: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function register(email, password, username) {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const result = await account.create(
        ID.unique(),
        email,
        password,
        username,
      );

      if (!result?.$id) {
        setError("Unable to register");
        return;
      }

      setSuccess(
        "You have successfully registered with Charity Bridge.\nLogging in...",
      );

      await login(email, password);
    } catch (error) {
      setError("Failed to register");
      console.error("Register error: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateName(name) {
    setLoading(true);

    try {
      await account.updateName(name);
      setUser((prev) => ({ ...prev, name: name }));
      message.success("User's name updated successfully");
    } catch (error) {
      console.error("Failed to update user's name: ", error.message);
      message.error("Failed to update user's name");
    } finally {
      setLoading(false);
    }
  }

  async function updatePassword(newPassword, oldPassword) {
    setLoading(true);

    try {
      await account.updatePassword(newPassword, oldPassword);
      message.success("Password updated successfully");
    } catch (error) {
      message.error("Failed to update password");
      console.error("Failed to update password: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function googleLogin() {
    setLoading(true);

    const redirectURL =
      window.location.hostname === "localhost"
        ? "http://localhost:5173/oauthsuccess"
        : "https://main--charitybridge.netlify.app/oauthsuccess";

    const failURL =
      window.location.hostname === "localhost"
        ? "http://localhost:5173/oauthfailure"
        : "https://main--charitybridge.netlify.app/oauthfailure";
    try {
      account.createOAuth2Session(OAuthProvider.Google, redirectURL, failURL);
      message.success("Google Login successful");
    } catch (err) {
      message.error("Failed to use Google login");
      console.error("Fail to use Google login", err.message);
    } finally {
      setLoading(false);
    }
  }

  async function facebookLogin() {
    setLoading(true);

    const redirectURL =
      window.location.hostname === "localhost"
        ? "http://localhost:5173/oauthsuccess"
        : "https://main--charitybridge.netlify.app/oauthsuccess";

    const failURL =
      window.location.hostname === "localhost"
        ? "http://localhost:5173/oauthfailure"
        : "https://main--charitybridge.netlify.app/oauthfailure";
    try {
      account.createOAuth2Session(OAuthProvider.Facebook, redirectURL, failURL);
      message.success("Facebook Login successful");
    } catch (err) {
      message.error("Failed to use Facebook login");
      console.error("Fail to use Facebook login", err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updatePrefs(newPrefs) {
    try {
      const updatePrefs = {
        ...user.prefs,
        ...newPrefs,
      };
      const result = await account.updatePrefs(updatePrefs);

      if (!result) {
        throw new Error("Unable to update prefs");
      }

      setUser(result);
      return result;
    } catch (err) {
      message.error("Failed to update preferences");
      console.error("Failed to update preferences: ", err.message);
      return null;
    }
  }

  async function emailVerification() {
    try {
      await account.createVerification(
        "https://main--charitybridge.netlify.app/verification",
      );
      message.success("Verification email sent!");
    } catch (err) {
      console.error("Failed to send email verification: ", err.message);
      message.error("Failed to send email verification");
    }
  }

  async function passwordRecovery(email) {
    try {
      await account.createRecovery(
        email,
        "https://main--charitybridge.netlify.app/passwordrecovery",
      );
      message.success("Password recovery sent");
    } catch (err) {
      console.error("Failed to send password recovery");
      message.error("Failed to send password recovery");
    }
  }

  return (
    <UserContext.Provider
      value={{
        current: user,
        isSession,
        loading,
        fetchSession,
        fetchUser,
        login,
        logout,
        register,
        updateName,
        updatePassword,
        googleLogin,
        facebookLogin,
        updatePrefs,
        emailVerification,
        passwordRecovery,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
