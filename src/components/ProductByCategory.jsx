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
    }, [])

    return (
        <div className="m-8">
            <Title>{category}</Title>
            {/* <div className="grid grid-cols-auto-fit gap-4"> */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: "1rem",
            }}>
                {documents && documents.map(d => (
                    <Link to={`/product/${d.$id}`} key={d.$id}>
                        <Card 
                            hoverable
                            cover={
                                <div>
                                    <img alt={`{d.product}'s pohto`} src={d.photoURL[0]} style={{width: "100%", height: "100px", objectFit: "contain"}} />
                                </div>
                            }
                        >
                            <Meta title={d.product} />
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}