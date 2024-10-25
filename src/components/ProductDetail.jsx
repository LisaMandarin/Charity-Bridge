import { useEffect, useState } from "react"
import { message } from "antd"
import { useParams } from "react-router-dom"
import { useProductInfo } from "../lib/context/productInfo"
import { ProductSlideShow } from "./ProductSlideShow"

export function ProductDetail() {
    const { productId } = useParams()
    const productInfo = useProductInfo()
    const [ product, setProduct ] = useState(null)
    const [ photoURL, setPhotoURL ] = useState([])


    useEffect(() => {
        if (!productId) {
            message.error("Invalid link")
            return
        }
        
        async function fetchProduct(id) {
            try {
                const result = await productInfo.getDocument(id)
                if (result) {
                    setProduct(result)
                } else {
                    message.error("Product not found")
                }
            } catch (error) {
                console.error("Failed to fetch product: ", error.message)
                message.error("Failed to fetch product")
            }
        }

        fetchProduct(productId)
    }, [productId])

    useEffect(() => {
        if (product?.photoURL) {
            setPhotoURL(product.photoURL)
        }
    }, [product?.photoURL])

    return (
        <>
            <p>This is product detail page: {productId}</p>
            <ProductSlideShow photoURL={ photoURL } />
            
        </>
    )
}