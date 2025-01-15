import { message } from "antd";
import { createContext, useContext, useState } from "react";
import { charityDatabase } from "../appwrite";
import { ID, Query } from "appwrite";
import client from "../appwrite";

const MessageContext = createContext();
export function useMessage() {
  return useContext(MessageContext);
}

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_MESSAGE_ID;

export function MessageProvider(props) {
  const [loading, setLoading] = useState(true);

  async function createMessage(msg) {
    setLoading(true);

    try {
      const result = await charityDatabase.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        msg,
      );

      return result;
    } catch (error) {
      console.error("Failed to create message: ", error.message);
      message.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  async function listMessages(senderId, receiverId) {
    setLoading(true);

    try {
      const result = await charityDatabase.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.or([
            Query.and([
              Query.equal("ownId", senderId),
              Query.equal("otherId", receiverId),
            ]),
            Query.and([
              Query.equal("ownId", receiverId),
              Query.equal("otherId", senderId),
            ]),
          ]),
        ],
      );

      if (!result || result.documents.length === 0) {
        console.error("No messages found");
        return [];
      }

      return result.documents.sort(
        (a, b) => new Date(a.$createdAt) - new Date(b.$createdAt),
      ); // sort the messages from the oldest to the latest
    } catch (error) {
      console.error("Failed to list messages: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function listOwnMessages(userId) {
    setLoading(true);

    try {
      if (!userId) {
        throw new Error("User ID is missing or invalid");
      }

      const result = await charityDatabase.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.or([
            Query.equal("ownId", [userId]),
            Query.equal("otherId", [userId]),
          ]),
        ],
      );

      if (!result || result.documents.length === 0) {
        return [];
      }

      return result.documents.sort(
        (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt),
      ); // sort the messages from the latest to the oldest
    } catch (error) {
      console.error("Failed to list messages related to you: ", error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }

  function subscribeToMessages(callback) {
    return client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
      (event) => {
        if (
          event.events.includes("databases.*.collections.*.documents.*.create")
        ) {
          callback(event.payload);
        }
      },
    );
  }

  return (
    <MessageContext.Provider
      value={{
        loading,
        createMessage,
        listMessages,
        listOwnMessages,
        subscribeToMessages,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
}
