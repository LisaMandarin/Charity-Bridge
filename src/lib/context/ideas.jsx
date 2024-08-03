import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

export const IDEAS_DATABASE_ID = "ideas-tracker"; // Replace with your database ID
export const IDEAS_COLLECTION_ID = "66ad0677001d16d6a0fd"; // Replace with your collection ID

const IdeasContext = createContext();

export function useIdeas() {
  return useContext(IdeasContext);
}

export function IdeasProvider(props) {
  const [ideas, setIdeas] = useState([]);

  async function add(idea) {
    try {
      if (!idea.userId) {
        throw new Error("Missing required attribute 'userId'")
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
    // const response = await databases.createDocument(
    //   IDEAS_DATABASE_ID,
    //   IDEAS_COLLECTION_ID,
    //   ID.unique(),
    //   idea
    // );
    // setIdeas((ideas) => [response, ...ideas].slice(0, 10));
  }

  async function remove(id) {
    try {
      await databases.deleteDocument(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        id)
        setIdeas(ideas => ideas.filter(idea => idea.$id !== id));
        await init()
    } catch (error) {
      console.error('Failed to remove idea: ', error)
    }
    // await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
    // setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
    // await init(); // Refetch ideas to ensure we have 10 items
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
    // const response = await databases.listDocuments(
    //   IDEAS_DATABASE_ID,
    //   IDEAS_COLLECTION_ID,
    //   [Query.orderDesc("$createdAt"), Query.limit(10)]
    // );
    // setIdeas(response.documents);
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
