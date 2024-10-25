import { Card, Pagination } from "antd";
import { useProductInfo } from "../lib/context/productInfo";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { Meta } = Card

export function ProductCard() {
    const productInfo = useProductInfo()
    const [ data, setData ] = useState([])
    const [ currentPage, setCurrentPage ] = useState(1)
    const itemsPerPage = 1

    const startIndex = (currentPage-1) * itemsPerPage
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage)

    useEffect(() => {
        async function fetchData() {
            const documents = await productInfo.listDocuments()
            
            setData(documents)
        }
        fetchData()
    }, [])

    return (
        <div className="w-full bg-white">
            <div className="w-full sm:w-[360px] p-4 m-auto">
                { currentItems && currentItems.map(item => (
                    <Link to={`/product/${item.$id}`} key={item.$id}>
                        <Card 
                            key={item.$id} 
                            hoverable
                            cover={
                                <div className="w-full aspect-square">
                                    <img alt="image1" src={item.photoURL[0]} className="w-full h-full object-cover object-center"/>
                                </div>
                            }
                        >
                            <Meta title={`${item.product}`} />
                        </Card>
                    </Link>
                ))}
            </div> 
            <div>
                <Pagination 
                    defaultCurrent={1}
                    total={data.length}
                    pageSize={1}
                    current={currentPage}
                    onChange={page => setCurrentPage(page)}
                    align="center"
                />
            </div>           
        </div>
    )

}