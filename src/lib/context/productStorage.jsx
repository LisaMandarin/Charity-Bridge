import { createContext, useContext, useState } from "react"
import { productStorage } from "../appwrite"
import { ID } from "appwrite"

export const BUCKET_PRODUCT_ID = "66f6ace5001dc6aa5c65"

const ProductStorageContext = createContext()

export function useProductStorage() {
    return useContext(ProductStorageContext)
}

export function ProductStorageProvider(props) {
    const [ fileId, setFileId ] = useState(null)
    
    async function createFile(file) {
        setFileId(null)
        try {
            const result = await productStorage.createFile(
                BUCKET_PRODUCT_ID,
                ID.unique(),
                file
            )
            setFileId(result.$id)
            return result
        } catch (err) {
            console.error('Failed to create File', err.message)
        }
    }
    async function deleteFile(id) {
        setFileId(null)
        try {
            await productStorage.deleteFile(
                BUCKET_PRODUCT_ID,
                id
            )
        } catch (err) {
            console.error('Failed to delete file: ', err.message)

        }
    }

    async function getPreviewURL(id) {
        try {
            const response = await productStorage.getFilePreview(
                BUCKET_PRODUCT_ID,
                id
            )
            return response.href
        } catch (err) {
            console.error('Failed to getPreview', err.message)
        }
    }

    return (
        <ProductStorageContext.Provider value={{fileId, createFile, deleteFile, getPreviewURL}}>
            {props.children}
        </ProductStorageContext.Provider>
    )
}