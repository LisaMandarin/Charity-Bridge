import { createContext, useContext, useState } from "react"
import { storage } from "../appwrite"
import { ID } from "appwrite"
import { message } from "antd"

export const BUCKET_AVATAR_ID = "66e14204003a70a632ed"

const StorageContext = createContext()

export function useStorage() {
    return useContext(StorageContext)
}

export function StorageProvider(props) {
    const [ fileId, setFileId ] = useState(null) 
    const [ loading, setLoading ] = useState(false)

    async function createAvatar(file) {
        setLoading(true)

        try {
            const result = await storage.createFile(
                BUCKET_AVATAR_ID,
                ID.unique(),
                file
            )

            message.success('Avatar uploaded successfully')
            setFileId(result.$id)
            return result

        } catch (error) {
            console.error('Failed to create avatar image: ', error.message)
            message.error('Failed to upload avatar image')
            setFileId(null)
            return null

        } finally {
            setLoading(false)
        }
    }

    async function deleteAvatar(id) {
        setLoading(true)

        try {
            await storage.deleteFile(BUCKET_AVATAR_ID, id)

            message.success('Avatar deleted successfully')
            setFileId(null)
            return true
        } catch (error) {
            console.error('Failed to delete avatar image: ', error.message)
            message.error('Failed to delete avatar image')
        } finally {
            setLoading(false)
        }
    }

    async function getPreviewURL(id) {
        try {
            const response = storage.getFilePreview(
                BUCKET_AVATAR_ID,
                id
            )
            return response.href
            
        } catch (err) {
            console.error('Failed to getPreview: ', err.message)
            message.error('Failed to get image preview')
            return null
        }
    }

    return (
        <StorageContext.Provider value={{fileId, loading, createAvatar, deleteAvatar, getPreviewURL}}>
            {props.children}
        </StorageContext.Provider>
    )
}