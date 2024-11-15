import { createContext, useContext, useState } from "react";
import { ID } from "appwrite";
import { userProfileDatabase } from "../appwrite";

const UserProfileContext = createContext()

export function useUserProfile() {
    return useContext(UserProfileContext)
}

const DATABASE_ID = import.meta.env.VITE_DATABASE_USER_PROFILE_ID
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_USER_PROFILE_ID

export function UserProfileProvider(props) {
    
    async function createProfile(form) {
        try {
            const result = await userProfileDatabase.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                form
            )
            return result
        } catch (err) {
            console.error('Failed to create profile: ', err.message)
        }
    }

    async function updateProfile(documentId, data) {
        try {
            if (!documentId) {
                throw new Error("Document ID is missing")
            }
            if (!data) {
                throw new Error("Please provide data to update")
            }
            const result = await userProfileDatabase.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                documentId,
                data
            )
            return result

        } catch (error) {
            console.error("Failed to update profile: ", error.message)
            return null
        }
    }

    async function getProfile(documentId) {
        try {
            if (!documentId) {
                throw new Error("Document ID is missing")
            }
            const result = await userProfileDatabase.getDocument(
                DATABASE_ID,
                COLLECTION_ID,
                documentId
            )
            return result

        } catch (error) {
            console.error("Failed to get the user profile: ", error.message)
            return null
        }
    }

    return (
        <UserProfileContext.Provider value={{ createProfile, updateProfile, getProfile }}>
            {props.children}
        </UserProfileContext.Provider>
    )
}