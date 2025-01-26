import { createContext, useContext, useState } from "react";
import { charityDatabase } from "../appwrite";
import { Query } from "appwrite";

const needsContext = createContext();

export function useNeeds() {
  return useContext(needsContext);
}

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_NEEDS_ID;

export function NeedsProvider(props) {
  const [loading, setLoading] = useState(true);

  async function listNeeds() {
    setLoading(true);
    try {
      const result = await charityDatabase.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc("$createdAt")],
      );

      if (!result || result.documents.length === 0) {
        console.error("No needs found");
        return [];
      }

      return result.documents;
    } catch (error) {
      console.error("Failed to list needs documents: ", error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }

  return (
    <needsContext.Provider value={{ loading, listNeeds }}>
      {props.children}
    </needsContext.Provider>
  );
}
