import { createContext, useContext } from "react";
import { ID } from "appwrite";
import { charityDatabase } from "../appwrite";

const UserProfileContext = createContext();

export function useUserProfile() {
  return useContext(UserProfileContext);
}

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_USER_PROFILE_ID;

export function UserProfileProvider(props) {
  async function createProfile(form) {
    try {
      const result = await charityDatabase.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        form,
      );
      return result;
    } catch (err) {
      console.error("Failed to create profile: ", err.message);
    }
  }

  async function updateProfile(documentId, data) {
    try {
      if (!documentId) {
        throw new Error("Document ID is missing");
      }
      if (!data) {
        throw new Error("Please provide data to update");
      }
      const result = await charityDatabase.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        documentId,
        data,
      );
      return result;
    } catch (error) {
      console.error("Failed to update profile: ", error.message);
      return null;
    }
  }

  async function getProfile(documentId) {
    try {
      if (!documentId) {
        throw new Error("Document ID is missing");
      }
      const result = await charityDatabase.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        documentId,
      );
      return result;
    } catch (error) {
      console.error("Failed to get the user profile: ", error.message);
      return null;
    }
  }

  async function getProfiles() {
    try {
      const result = await charityDatabase.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
      );
      return result.documents;
    } catch (error) {
      console.error("Failed to get all the user profiles: ", error.message);
    }
  }

  async function getProfileByQuery(query) {
    try {
      if (!query) {
        console.error("Invalid query");
        return null;
      }

      const result = await charityDatabase.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [query],
      );
      return result.documents;
    } catch (error) {
      console.error("Failed to get profile by query: ", error.message);
      return null;
    }
  }

  return (
    <UserProfileContext.Provider
      value={{
        createProfile,
        updateProfile,
        getProfile,
        getProfiles,
        getProfileByQuery,
      }}
    >
      {props.children}
    </UserProfileContext.Provider>
  );
}
