import { Query } from "appwrite"
import { useEffect, useState } from "react"
import { useProductInfo } from "../lib/context/productInfo"
import { message } from "antd"
import { useParams } from "react-router-dom"

export function ProductByCategory() {
    const { category } = useParams()
    const query = Query.equal("category", [category])
    const productInfo = useProductInfo()
    const [ documents, setDocuments ] = useState([])
    
    useEffect(() => {
        async function fetchProducts() {
            const result = await productInfo.listDocumentsByQuery(query)
            if(!result) {
                console.error("No documents in food category is found")
                message.error("No documents in food category is found")
            }

            setDocuments(result)
        }
        fetchProducts()
    }, [])

    useEffect(() => {
        console.log("documents: ", documents)
    }, [documents])
    return (
        <>
            <p>Category template: {category}</p>
        </>
    )
}