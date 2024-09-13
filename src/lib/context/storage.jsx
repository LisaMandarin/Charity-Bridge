import { createContext, useContext, useState } from "react"
import { storage } from "../appwrite"
import { ID } from "appwrite"

export const BUCKET_AVATAR_ID = "66e14204003a70a632ed"

const StorageContext = createContext()

export function useStorage() {
    return useContext(StorageContext)
}

export function StorageProvider(props) {
    const [ error, setError ] = useState(null)
    const [ success, setSuccess ] = useState(null)
    const [ fileId, setFileId ] = useState(null) 

    async function createAvatar(file) {
        setError(null)
        setSuccess(null)
        setFileId(null)
        try {
            const result = await storage.createFile(
                BUCKET_AVATAR_ID,
                ID.unique(),
                file
            )
            setSuccess('Avatar uploaded successfully')
            setFileId(result.$id)
        } catch (err) {
            console.error('Failed to create avatar image: ', err.message)
            setError('Failed to upload avatar image')
        }
    }

    async function deleteAvatar(id) {
        setError(null)
        setSuccess(null)
        setFileId(null)
        try {
            const result = await storage.deleteFile(
                BUCKET_AVATAR_ID,
                id
            )
        } catch (err) {
            console.error('Failed to delete avatar image: ', err.message)
            setError('Failed to delete avatar image')
        }
    }

    async function getPreviewURL(id) {
        setError(null)
        setSuccess(null)
        try {
            const response = await storage.getFilePreview(
                BUCKET_AVATAR_ID,
                id
            )
            return response.href
        } catch (err) {
            console.error('Failed to getPreview: ', err.message)
            setError('Failed to get image preview')
        }
    }

    return (
        <StorageContext.Provider value={{error, success, fileId, createAvatar, deleteAvatar, getPreviewURL}}>
            {props.children}
        </StorageContext.Provider>
    )
}