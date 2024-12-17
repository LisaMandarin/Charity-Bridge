import { createContext, useContext, useState } from "react";
import { charityDatabase } from "../appwrite";
import { ID } from "appwrite";
import { message } from "antd";
import { Query } from "node-appwrite";

const reviewsContext = createContext();

export function useReviews() {
  return useContext(reviewsContext);
}

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_REVIEWS_ID;

export function ReviewsProvider(props) {
  const [loading, setLoading] = useState(true);

  async function createReview(form) {
    setLoading(true);
    try {
      const result = await charityDatabase.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        form,
      );

      return result;
    } catch (error) {
      console.error("Failed to create form: ", error.message);
      message.error("Failed to create form.");
    } finally {
      setLoading(false);
    }
  }

  async function listReviews(form) {
    setLoading(true);
    try {
      const result = await charityDatabase.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc("created")],
      );

      if (!result || result.length === 0) {
        throw new Error("No reviews found");
      }

      return result.documents;
    } catch (error) {
      console.error("Failed to list reviews", error.message);
      message.error("Failed to list reviews");
    } finally {
      setLoading(false);
    }
  }

  return (
    <reviewsContext.Provider
      value={{
        loading,
        createReview,
        listReviews,
      }}
    >
      {props.children}
    </reviewsContext.Provider>
  );
}
