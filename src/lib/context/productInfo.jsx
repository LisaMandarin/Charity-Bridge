import { createContext, useContext, useState } from "react";
import { productInfoDatabase } from "../appwrite";
import { ID } from "appwrite";

const ProductInfoContext = createContext()
export function useProductInfo() {
    return useContext(ProductInfoContext) 
}

const DATABASE_ID = "66f6ab28003078219c0a"
const COLLECTION_ID = "66f6ab380018a24eb353"

export function ProductInfoProvider(props) {
    const [ error, setError ] = useState(null)
    
    async function createForm(form) {
        setError(null)
        try {
            const result = await productInfoDatabase.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                form
            )
            console.log('form created successfully', result)
            return result
        } catch(err) {
            console.error('Failed to create form: ', err.message)
            setError('Failed to create form')
        }
    }
    
    async function listDocuments(query) {
        setError(null)
        try {
            await productInfoDatabase.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                query
            )
        } catch(err) {
            console.error('Failed to list product information: ', err.message)
            setError('Failed to list product information')
        }
    }

    async function deleteForm(id) {
        setError(null)
        try {
            const result = await productInfoDatabase.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            )
            console.log('form deleted successfully: ', result)
        } catch(err) {
            console.error('Failed to delete form: ', err.message)
            setError('Failed to delete form')
        }
    }

    return (
        <ProductInfoContext.Provider value={{error, createForm, listDocuments, deleteForm}}>
            {props.children}
        </ProductInfoContext.Provider>
    )
}