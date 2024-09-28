import { useEffect, useState } from "react"
import { useProductInfo } from "../lib/context/productInfo"
import { Table } from "antd"
import dayjs from "dayjs"
import { useUser } from "../lib/context/user"

export function HomePost() {
    const productInfo = useProductInfo()
    const [ data, setData ] = useState([])
    const [ dataTable, setDataTable ] = useState([])

    const columns = [
        {title: 'Product', dataIndex: 'product', key: 'product'},
        {title: 'Category', dataIndex: 'category', key: 'category'},
        {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
        {title: 'Condition', dataIndex: 'condition', key: 'condition'},
        {title: 'Description', dataIndex: 'description', key: 'condition'},
        {title: 'Location', dataIndex: 'location', key: 'location'},
        {title: 'time', dataIndex: 'time', key: 'time'},
        {title: 'Contributor', dataIndex: 'contributor', key: 'contributor'}
    ]
    useEffect(() => {
        productInfo.listDocuments()
            .then(response => setData(response.documents))
    }, [productInfo, setData])

    useEffect(() => {
        if (data.length > 0) {
            const newDataTable = data.map(d => ({    
                key: d.$id,
                product: d.product,
                category: d.category,
                quantity: d.quantity,
                condition: d.condition,
                description: d.description,
                location: d.location,
                time: formatDay(d.time),
                contributor: d.userId
            }))
            setDataTable(newDataTable)
        }
    }, [data])
    
    const formatDay = (time) => {
        const newDay = dayjs(time).format('YYYY-MM-DD')
        return newDay
    }

    useEffect(() => console.log('data: ', data), [data])
    useEffect(() => console.log('dataTable: ',dataTable), [dataTable])

    return (
        <div className="">
            <Table dataSource={dataTable} columns={columns} />
        </div>
    )
}