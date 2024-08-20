import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

export const IDEAS_DATABASE_ID = "66c45c1d003ba7168733"; // Replace with your database ID
export const IDEAS_COLLECTION_ID = "66c45c3b002cfb663d16"; // Replace with your collection ID

const IdeasContext = createContext();

export function useIdeas() {
  return useContext(IdeasContext);
}

export function IdeasProvider(props) {
  const [ideas, setIdeas] = useState([]);

  async function add(idea) {
    try {
      if (!idea.userID) {
        throw new Error("Missing required attribute 'userID'")
      }
      
      const response = await databases.createDocument(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        ID.unique(),
        idea
      )
      setIdeas(ideas => [response, ...ideas].slice(0, 10))
    } catch (error) {
      console.error('Failed to add idea: ', error);
    }

  }

  async function remove(id) {
    try {
      await databases.deleteDocument(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        id)
        setIdeas(ideas => ideas.filter(idea => idea.$id !== id));
    } catch (error) {
      console.error('Failed to remove idea: ', error)
    }
  }

  async function init() {
    try {
      const response = await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      setIdeas(response.documents)
    } catch (error) {
      console.error('Failed to fetch ideas: ', error)
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove }}>
      {props.children}
    </IdeasContext.Provider>
  );
}
