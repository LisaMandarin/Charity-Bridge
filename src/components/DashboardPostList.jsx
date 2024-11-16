import { useEffect, useState } from "react"
import { useProductInfo } from "../lib/context/productInfo"
import { useProductStorage } from "../lib/context/productStorage"
import { Query } from "appwrite"
import dayjs from "dayjs"
import { Button, message, Space, Spin, Table, Typography } from "antd"
import { Link } from "react-router-dom"
const { Title } = Typography

export function DashboardPostList({user}) {
    const productInfo = useProductInfo()
    const productStorage = useProductStorage()
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
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <Space direction="horizontal" size="middle">
                    <Button onClick={() => editPost(record)}>Edit</Button>
                    <Button onClick={() => deletePost(record)}>Delete</Button>
                </Space>
            )
        }
    ]

    const editPost = async(record) => {
        // do something
    }

    const deletePost = async(record) => {
        try {
            const documentResult = await productInfo.deleteForm(record.key)
            if (!documentResult) {
                console.error("Failed to delete document")
                return
            }
            const fileResult = await Promise.all(
                record.photos.map(async (photo) => await productStorage.deleteFile(photo)))

            const allFilesDeleted = fileResult.every(result => result === true)
            if (!allFilesDeleted) {
                console.error("Failed to delete some photos")
                message.error("Failed to delete some photos")
                return
            }

            message.success("The post is deleted")
            setPosts( current => current.filter(post => post.$id !== record.key))
        } catch (error) {
            console.error("An error occurred while deleting the post: ", error.message)
            message.error("An error occurred while deleting the post")
        }

    }

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
                product: <Link to={`../product/${post.$id}`} target="_blank">{post.product}</Link>,
                time: dayjs(post.time).format('MM/DD/YYYY'),
                photos: post.photos
            }))
            setDataSource(data)
        }
    }, [posts])

    return (
        <>
            <Spin spinning={productInfo.loading}>
                <Title className="text-center">{user?.current?.name ? `${user.current.name}'s` : "My"} Posts</Title>
                <Table dataSource={dataSource} columns={columns} />
            </Spin>
        </>
    )
}