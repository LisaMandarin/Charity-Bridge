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
    const [ success, setSuccess ] = useState(null)
    const [ error, setError ] = useState(null)
    
    async function createForm(form) {
        setError(null)
        setSuccess(null)
        try {
            const result = await userProfileDatabase.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                form
            )
            setSuccess('Your profile is updated')
            return result
        } catch (err) {
            console.error('Failed to create form: ', err.message)
            setError('Failed to update your profile')
        }
    }

    return (
        <UserProfileContext.Provider value={{ error, success, createForm }}>
            {props.children}
        </UserProfileContext.Provider>
    )
}