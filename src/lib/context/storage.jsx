import { createContext, useContext, useEffect, useState } from "react"
import { storage } from "../appwrite"
import { ID } from "appwrite"

export const BUCKET_AVATAR_ID = "66e14204003a70a632ed"

const StorageContext = createContext()

export function useStorage() {
    return useContext(StorageContext)
}

export function StorageProvider(props) {
    const [ avatar, setAvatar ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ success, setSuccess ] = useState(null)

    async function fetchAvatar() {
        setError(null)
        setSuccess(null)
        const response = await storage.listFiles(
            BUCKET_AVATAR_ID,
        )
        setAvatar(response.files[0])
    }

    useEffect(() => {
        fetchAvatar()
    }, [])

    async function uploadAvatar(file) {
        setError(null)
        setSuccess(null)
        try {
            await storage.createFile(
                BUCKET_AVATAR_ID,
                ID.unique(),
                file
            )
            setSuccess('Avatar uploaded successfully')
        } catch (err) {
            console.error('Failed to upload avatar image: ', err.message)
            setError('Failed to upload avatar image')
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
            setSuccess('Get image preview successfully')
            return response.href
        } catch (err) {
            console.error('Failed to getPreview: ', err.message)
            setError('Failed to get image preview')
        }
    }

    return (
        <StorageContext.Provider value={{current: avatar, error, success, uploadAvatar, getPreviewURL}}>
            {props.children}
        </StorageContext.Provider>
    )
}