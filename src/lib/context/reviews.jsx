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

  /* ********************************
  Get the documents.  
  Default skipping(offset) is 0.  
  Only retrieve 6 items at a time.
  ***************************&&&&&& */
  async function listReviews() {
    setLoading(true);
    try {
      const result = await charityDatabase.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc("$updatedAt" || "$createdAt")],
      );

      if (!result || result.documents.length === 0) {
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

  async function listReviewsByQuery(query) {
    setLoading(true);

    if (!query) {
      console.error("Query is invalid");
      return [];
    }

    try {
      const result = await charityDatabase.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc("$createdAt"), query],
      );

      if (!result || result.documents.length === 0) {
        return [];
      }

      return result.documents;
    } catch (error) {
      console.error("Failed to list reviews by query: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateReview(id, data) {
    try {
      setLoading(true);

      if (!id) {
        throw new Error("Review document ID not found");
      }

      const result = await charityDatabase.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        data,
      );

      return result;
    } catch (error) {
      console.error("Failed to updateReview: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteReview(id) {
    try {
      setLoading(true);

      if (!id) {
        throw new Error("Invalid review document ID");
      }

      await charityDatabase.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    } catch (error) {
      console.error("Failed to delete review: ", error.message);
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
        listReviewsByQuery,
        updateReview,
        deleteReview,
      }}
    >
      {props.children}
    </reviewsContext.Provider>
  );
}
