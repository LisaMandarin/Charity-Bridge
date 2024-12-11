import { message } from "antd";
import { createContext, useContext, useState } from "react";
import { messageDatabase } from "../appwrite";
import { ID } from "appwrite";

const MessageContext = createContext();
export function useMessage() {
  return useContext(MessageContext);
}

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTIOM_MESSAGE_ID;

export function MessageProvider(props) {
  const [loading, setLoading] = useState(null);

  async function createMessage(msg) {
    setLoading(false);

    try {
      const result = await messageDatabase.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        msg,
      );
      message.success("Message sent");
      return result;
    } catch (error) {
      console.error("Failed to create message: ", error.message);
      message.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  }
  return (
    <MessageContext.Provider value={{ loading, createMessage }}>
      {props.children}
    </MessageContext.Provider>
  );
}
