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
        throw new Error("No needs found");
      }

      return result.documents;
    } catch {
      console.error("Failed to list needs documents");
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
