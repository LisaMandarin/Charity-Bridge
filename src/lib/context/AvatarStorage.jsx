import { createContext, useContext, useState } from "react";
import { avatarStorage } from "../appwrite";
import { ID } from "appwrite";
import { message } from "antd";

export const BUCKET_AVATAR_ID = import.meta.env.VITE_BUCKET_AVATAR_STORAGE_ID;

const AvatarStorageContext = createContext();

export function useAvatarStorage() {
  return useContext(AvatarStorageContext);
}

export function AvatarStorageProvider(props) {
  const [fileId, setFileId] = useState(null);
  const [loading, setLoading] = useState(false);

  async function createAvatar(file) {
    setLoading(true);

    try {
      const result = await avatarStorage.createFile(
        BUCKET_AVATAR_ID,
        ID.unique(),
        file,
      );

      message.success("Avatar uploaded successfully");
      setFileId(result.$id);
      return result;
    } catch (error) {
      console.error("Failed to create avatar image: ", error.message);
      message.error("Failed to upload avatar image");
      setFileId(null);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function deleteAvatar(id) {
    setLoading(true);

    try {
      await avatarStorage.deleteFile(BUCKET_AVATAR_ID, id);

      message.success("Avatar deleted successfully");
      setFileId(null);
      return true;
    } catch (error) {
      console.error("Failed to delete avatar image: ", error.message);
      message.error("Failed to delete avatar image");
    } finally {
      setLoading(false);
    }
  }

  async function getPreviewURL(id) {
    try {
      const response = avatarStorage.getFilePreview(
        BUCKET_AVATAR_ID,
        id,
        60,
        60,
      );
      return response.href;
    } catch (err) {
      console.error("Failed to getPreview: ", err.message);
      message.error("Failed to get image preview");
      return null;
    }
  }

  return (
    <AvatarStorageContext.Provider
      value={{ fileId, loading, createAvatar, deleteAvatar, getPreviewURL }}
    >
      {props.children}
    </AvatarStorageContext.Provider>
  );
}
