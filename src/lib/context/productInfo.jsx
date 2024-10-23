import { createContext, useContext, useState } from "react";
import { productInfoDatabase } from "../appwrite";
import { ID } from "appwrite";
import { message } from "antd";

const ProductInfoContext = createContext()
export function useProductInfo() {
    return useContext(ProductInfoContext) 
}

const DATABASE_ID = "66f6ab28003078219c0a"
const COLLECTION_ID = "66f6ab380018a24eb353"

export function ProductInfoProvider(props) {
    const [ loading, setLoading ] = useState(false)

    async function createForm(form) {
        setLoading(true)
        try {
            const result = await productInfoDatabase.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                form
            )
            return result

        } catch(error) {
            console.error('Failed to create form: ', error.message)
            message.error('Failed to create form')
            return null

        } finally {
            setLoading(false)
        }
    }
    
    async function listDocuments() {
        setLoading(true)
        try {
            const result = await productInfoDatabase.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
            )

            if (!result || result.documents.length === 0) {
                throw new Error("No documents found")
            }

            return result.documents

        } catch(err) {
            console.error('Failed to list product information: ', err.message)
            message.error('Failed to list product information')
            return null

        } finally {
            setLoading(false)
        }
    }

    async function deleteForm(id) {
        if (!id) {
            message.error("Invalid document ID")
            return false
        }

        setLoading(true)

        try {
            const result = await productInfoDatabase.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            )
            
            if (!result) {
                throw new Error("Failed to delete document")
            }

            return true
            
        } catch(err) {
            console.error('Failed to delete form: ', err.message)
            message.error('Failed to delete form')
            return false

        } finally {
            setLoading(false)
        }
    }

    return (
        <ProductInfoContext.Provider value={{loading, createForm, listDocuments, deleteForm}}>
            {props.children}
        </ProductInfoContext.Provider>
    )
}