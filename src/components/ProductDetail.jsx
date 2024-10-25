import { useEffect, useState } from "react"
import { message, Space } from "antd"
import { useParams } from "react-router-dom"
import { useProductInfo } from "../lib/context/productInfo"
import { ProductSlideShow } from "./ProductSlideShow"
import dayjs from "dayjs"
import {Typography} from "antd"
const { Title } = Typography


export function ProductDetail() {
    const { productId } = useParams()
    const productInfo = useProductInfo()
    const [ product, setProduct ] = useState(null)
    const [ time, setTime ] = useState(null)


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
        if (product?.time) {
            const newTime = dayjs(product.time)
            setTime(newTime)
        }
    }, [product?.time])

    return (
        <>
            { product && (
                <>
                    <div className="flex flex-row justify-center bg-slate-100">
                        <div className="p-8">
                            <ProductSlideShow photoURL={ product.photoURL } />
                        </div>
                        <ul className="p-8">
                            <Space direction="vertical">
                                <li><Title>{product.product}</Title><br /></li>
                                <li><span className="font-extrabold">Quantity: </span>{product.quantity}</li>
                                <li><span className="font-extrabold">Condition: </span>{product.condition}</li>
                                <li><span className="font-extrabold">Category: </span>{product.category}</li>
                                <li><span className="font-extrabold">Location: </span>{product.location}</li>
                                <li><span className="font-extrabold">Description: </span>{product.description}</li>
                                <li><span className="font-extrabold">Post time: </span>{time ? time.format('MM/DD/YYYY') : "N/A"}</li>
                            </Space>
                            
                        </ul>
                    </div> 
                    
                    
                </>
            )}
            
            
        </>
    )
}