import { useEffect, useState } from "react"
import { useProductInfo } from "../lib/context/productInfo"
import { Query } from "appwrite"
import dayjs from "dayjs"
import { Table } from "antd"

export function DashboardPostList({user}) {
    const productInfo = useProductInfo()
    const [ userId, setUserId ] = useState()
    const [ posts, setPosts ] = useState([])
    const [ dataSource, setDataSource ] = useState([])
    const columns = [
        {
            title: "Product",
            dataIndex: "product",
            key: 'product'
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time"
        },
        {
            Action: "Action",
            dataIndex: "action",
            key: "action"
        }
    ]

    useEffect(() => {
        if (user?.current?.$id) {
            setUserId(user.current.$id)
        }  
    }, [user?.current?.$id])

    useEffect(() => {
        async function fetchPosts() {
            const query = Query.equal("userId", [userId])
            const result = await productInfo.listDocumentsByQuery(query)
            if (!result) return
            setPosts(result)
        }
        if (userId) {
            fetchPosts()
        }
    }, [userId])


    useEffect(() => {
        if (posts) {
            const data = posts.map(post => ({
                key: post.$id,
                product: post.product,
                time: dayjs(post.time).format('MM/DD/YYYY')
            }))
            setDataSource(data)
        }
    }, [posts])

    return (
        <Table dataSource={dataSource} columns={columns} />
    )
}