import { createContext, useContext, useState } from "react";
import { charityDatabase } from "../appwrite";
import { ID, Query } from "appwrite";
import { message } from "antd";

const ProductInfoContext = createContext();
export function useProductInfo() {
  return useContext(ProductInfoContext);
}

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_PRODUCT_INFO_ID;

export function ProductInfoProvider(props) {
  const [loading, setLoading] = useState(true);

  async function createForm(form) {
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
      message.error("Failed to create form");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function listDocuments() {
    setLoading(true);
    try {
      const result = await charityDatabase.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc("time")],
      );

      if (!result || result.documents.length === 0) {
        throw new Error("No documents found");
      }

      return result.documents;
    } catch (err) {
      console.error("Failed to list product information: ", err.message);
      // message.error("Failed to list product information");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function deleteForm(id) {
    if (!id) {
      message.error("Invalid document ID");
      return false;
    }

    setLoading(true);

    try {
      const result = await charityDatabase.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
      );

      if (!result) {
        throw new Error("Failed to delete document");
      }

      return true;
    } catch (err) {
      console.error("Failed to delete form: ", err.message);
      message.error("Failed to delete form");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function getDocument(id) {
    if (!id) {
      message.error("Invalid product ID");
    }
    try {
      const result = await charityDatabase.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
      );

      if (!result) {
        throw new Error("Can't get product information");
      }

      return result;
    } catch (error) {
      console.error("Failed to get product information: ", error.message);
      message.error("Failed to get product information");
      return null;
    }
  }

  async function listDocumentsByQuery(query) {
    setLoading(true);
    if (!query) {
      console.error("Query is missing");
      return;
    }

    try {
      const result = await charityDatabase.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc("time"), query],
      );

      if (!result || result.documents.length === 0) {
        throw new Error("No documents by query found");
      }

      return result.documents;
    } catch (err) {
      console.error(
        "Failed to list product information by query: ",
        err.message,
      );

      return null;
    } finally {
      setLoading(false);
    }
  }

  async function updateDocument(id, data) {
    setLoading(true);
    try {
      const result = await charityDatabase.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        data,
      );

      if (!result) {
        throw new Error("No documents updated");
      }
      message.success("Product information updated successfully");
      return result;
    } catch (error) {
      console.error("Failed to update product information", error.message);
      message.error("Failed to update product information");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProductInfoContext.Provider
      value={{
        loading,
        createForm,
        listDocuments,
        deleteForm,
        getDocument,
        listDocumentsByQuery,
        updateDocument,
      }}
    >
      {props.children}
    </ProductInfoContext.Provider>
  );
}
