import { createContext, useContext, useState } from "react"
import { storage } from "../appwrite"
import { ID } from "appwrite"

export const BUCKET_ID = "66e14204003a70a632ed"

const StorageContext = createContext()

export function useStorage() {
    return useContext(StorageContext)
}

export function StorageProvider(props) {
    const [ avatar, setAvatar ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ success, setSuccess ] = useState(null)

    async function uploadAvatar(file) {
        setError(null)
        setSuccess(null)
        try {
            const response = await storage.createFile(
                BUCKET_ID,
                ID.unique(),
                file
            )
            console.log('Avatar uploaded successfully: ', response)
            setSuccess('Avatar uploaded successfully')
        } catch (err) {
            console.error('Failed to upload avatar image: ', err.message)
            setError('Failed to upload avatar image')
        }
    }

    return (
        <StorageContext.Provider value={{current: avatar, error, success, uploadAvatar}}>
            {props.children}
        </StorageContext.Provider>
    )
}