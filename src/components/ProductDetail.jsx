import { useEffect, useState } from "react"
import { Avatar, Button, Card, message, Space } from "antd"
import { Link, useParams } from "react-router-dom"
import { useProductInfo } from "../lib/context/productInfo"
import { ProductSlideShow } from "./ProductSlideShow"
import dayjs from "dayjs"
import { getUser } from "../lib/serverAppwrite"
import {Typography} from "antd"
import { useUserProfile } from "../lib/context/userProfile"
import { StarOutlined } from "@ant-design/icons"
import { Icon } from "@iconify/react/dist/iconify.js"
const { Title } = Typography

export function ProductDetail() {
    const { productId } = useParams()
    const productInfo = useProductInfo()
    const userProfile = useUserProfile()
    const [ product, setProduct ] = useState(null)
    const [ contributor, setContributor ] = useState()
    const [ profile, setProfile ] = useState()
    
    // --------Profile Card-------
    const [ open, setOpen ] = useState(false)
    const [ contentList, setContentList ] = useState({})
    const [ activeTabKey, setActiveTabKey ] = useState("contact")
    
    const onTabChange = (key) => {
        setActiveTabKey(key)
    }

    const toggleOpen = () => {
        setOpen(current => !current)
    }
    //--------Profile Card-------

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
        async function fetchContributor() {
            if (product?.userId) {
                const result = await getUser(product.userId)
                setContributor({
                    name: result.name,
                    avatarId: result.prefs?.avatarId || null,
                    avatarUrl: result.prefs?.avatarUrl || null,
                    profileId: result.prefs?.profileId || null
                })
            }
        }

        fetchContributor()
        
    }, [product?.userId])

    useEffect(() => {
        async function fetchProfile() {
            try {
                if (contributor?.profileId) {
                    const result = await userProfile.getProfile(contributor.profileId)
                    setProfile(result)
                }
            } catch (error) {
                console.error("Failed to fetch the user's profile: ", error.message)
                message.error("Failed to fetch the user's profile: ")
            }
        }
        fetchProfile()

    }, [contributor?.profileId])

    useEffect(() => {
        if (profile) {
            setContentList({
                contact: 
                    <ul className="leading-8">
                        <li><Icon icon="ic:outline-email" width="1.5rem" height="1.5rem" className="inline"/> {profile.email ? profile.email : "N/A"}</li>
                        <li><Icon icon="ic:outline-phone" width="1.5rem" height="1.5rem" className="inline" /> {profile.phone ? profile.phone : "N/A"}</li>
                        <li><Icon icon="lsicon:house-outline" width="1.5rem" height="1.5rem" className="inline" /> {profile.address ? profile.address : "N/A"}</li>
                    </ul>,
                about: 
                    <ul className="max-w-[360px] whitespace-normal overflow-hidden leading-8">
                        <li><strong>Name: </strong>{profile.name ? profile.name : "N/A"}</li>
                        <li><strong>Birthday: </strong>{profile.birthday ? dayjs(profile.birthday).format("MM/DD/YYYY") : "N/A"}</li>
                        <li><strong>Gender: </strong>{profile.gender ? 
                            <>
                                {profile.gender === "male" && <Icon icon="tabler:gender-male" width="1.5rem" height="1.5rem" className="inline"/>}
                                {profile.gender === "female" && <Icon icon="tabler:gender-female" width="1.5rem" height="1.5rem" className="inline"/>}
                                {profile.gender === "LGBTQ" && <Icon icon="tabler:gender-bigender" width="1.5rem" height="1.5rem" className="inline"/>}
                            </>
                            : "N/A"}</li>
                        <li><strong>Introduction: </strong>{profile.introduction ? profile.introduction : "N/A"}</li>
                    </ul>,
            })
        }
    }, [profile])

    return (
        <>
            { product && (
                <>
                    <div className="flex flex-col sm:flex-row justify-center bg-slate-100">
                        <div className="p-8 bg-gray-900">
                            <ProductSlideShow photoURL={ product.photoURL } />
                        </div>
                        <div>
                            <ul className="p-8">
                                <Space direction="vertical">
                                    <li><Title>{product.product}</Title><br /></li>
                                    <li><span className="font-extrabold">Quantity: </span>{product.quantity}</li>
                                    <li><span className="font-extrabold">Condition: </span>{product.condition}</li>
                                    <li><span className="font-extrabold">Category: </span><Link to={`/category/${product.category}`}>{product.category}</Link></li>
                                    <li><span className="font-extrabold">Location: </span>{product.location}</li>
                                    <li><span className="font-extrabold">Description: </span>{product.description}</li>
                                    <li><span className="font-extrabold">Post time: </span>{product?.time ? dayjs(product.time).format('MM/DD/YYYY') : "N/A"}</li>
                                    <li>
                                        <span className="font-extrabold">Contributor: </span> 
                                        <Button variant="link" color="default" onClick={toggleOpen}>
                                            {contributor?.avatarUrl && <Avatar src={contributor.avatarUrl}/>} {contributor ? contributor.name : "N/A"}
                                        </Button>
                                    </li>
                                </Space>
                            </ul>
                            { profile && open && (
                                <Card 
                                    style={{ width: "100%"}}
                                    title={<div>{profile.name} <StarOutlined /><StarOutlined /><StarOutlined /></div>}
                                    extra={<Link to={`/userProduct/${profile.userId}`}>more posts</Link>}
                                    tabList={[
                                        { key: "contact", tab: "Contact" },
                                        { key: "about", tab: `About ${profile.name}` },
                                    ]}
                                    activeTabKey={activeTabKey}
                                    onTabChange={onTabChange}
                                >
                                    {contentList[activeTabKey]}
                                </Card>
                            )}
                        </div>
                    </div> 
                </>
            )}
        </>
    )
}