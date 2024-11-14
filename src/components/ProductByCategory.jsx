import { Query } from "appwrite"
import { useEffect, useState } from "react"
import { useProductInfo } from "../lib/context/productInfo"
import { Card, message, Typography } from "antd"
import { Link, useParams } from "react-router-dom"
const { Title } = Typography
const { Meta } = Card

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
    }, [query])

    return (
        <div className="p-8 text-center">
            <Title>{category}</Title>
            <div className="flex flex-wrap bg-white gap-4 justify-center">
                {documents && documents.map(d => (
                    <Link to={`/product/${d.$id}`} key={d.$id}>
                        <Card 
                            hoverable
                            cover={
                                <div>
                                    <img alt={`{d.product}'s photo`} src={d.photoURL[0]} style={{width: "100%", height: "100px", objectFit: "contain"}} />
                                </div>
                            }
                            className="w-[150px] h-[200px]"
                        >
                            <Meta title={<div className="text-wrap">{d.product}</div>} />
                            
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}