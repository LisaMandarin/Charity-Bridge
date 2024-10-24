import { createContext, useContext, useState } from "react"
import { productStorage } from "../appwrite"
import { ID } from "appwrite"
import { message } from "antd"

export const BUCKET_PRODUCT_ID = "66f6ace5001dc6aa5c65"

const ProductStorageContext = createContext()

export function useProductStorage() {
    return useContext(ProductStorageContext)
}

export function ProductStorageProvider(props) {
    const [ fileId, setFileId ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    
    async function createFile(file) {
        if (!file) {
            throw new Error("Invalid file input when creating file")
        }

        setLoading(true)

        try {
            const result = await productStorage.createFile(
                BUCKET_PRODUCT_ID,
                ID.unique(),
                file
            )

            if (!result?.$id) {
                throw new Error("Failed to upload file to server")
            }

            setFileId(result.$id)
            return result

        } catch (err) {
            console.error('Failed to create File', err.message)
            message.error("Failed to upload image to server")
            return null

        } finally {
            setLoading(false)
        }
    }

    async function deleteFile(id) {
        if (!id) {
            throw new Error("Invalid file ID when deleting file")
        }
        setLoading(true)

        try {
            await productStorage.deleteFile(
                BUCKET_PRODUCT_ID,
                id
            )

            return true

        } catch (err) {
            console.error('Failed to delete file: ', err.message)
            message.error("Failed to delete image")
            return false
        
        } finally {
            setLoading(false)
        }
    }

    async function getPreviewURL(id) {
        if (!id) {
            throw new Error("Invalid file ID when getting preview URL")
        }

        try {
            const response = productStorage.getFilePreview(
                BUCKET_PRODUCT_ID,
                id
            )

            if (!response) {
                throw new Error("Failed to get file preview image url")
            }
            return response.href

        } catch (err) {
            console.error('Failed to getPreview', err.message)
            return null
        }
    }

    return (
        <ProductStorageContext.Provider value={{fileId, loading, createFile, deleteFile, getPreviewURL}}>
            {props.children}
        </ProductStorageContext.Provider>
    )
}