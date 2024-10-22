import { Flex, Button, Avatar } from "antd"
import { useUser } from "../lib/context/user"
import { UserOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { useStorage } from "../lib/context/storage"
import { Link } from "react-router-dom"

export function HeaderUser() {
    const user = useUser()
    const storage = useStorage()
    const [ avatarURL, setAvatarURL ] = useState('')

    useEffect(() => {
        if (user.current && user.current.prefs && user.current.prefs.avatarId) {
            const avatarId = user.current.prefs.avatarId
            storage.getPreviewURL(avatarId)
                .then((url) => {
                    setAvatarURL(url)
                })
                .catch((error) => console.error("Failed to fetch avatar URL", error.message))
        } else {
            setAvatarURL('')
        }
    }, [user.current])

    return (
        <>
            { user.current ? (
                <div className="w-fit flex flex-row justify-around p-1 h-full border-4 border-pink-200">
                    <Avatar 
                        size={60} 
                        icon={<UserOutlined />} 
                        src={avatarURL}    
                        className="my-auto"
                    />
                    <Flex 
                        vertical 
                        align="flex-end" 
                        justify="flex-end" 
                    >
                        <p><Link to="/dashboard">Hello, {user.current.name}</Link></p>
                        <p><Link to="#" onClick={() => user.logout()}>Logout</Link></p>
                    </Flex>
                </div>
            ) : (
                <Flex 
                    vertical 
                    align="center" 
                    justify="center" 
                    className="p-1 h-full border-solid border-4 border-pink-200" 
                    gap={16}>
                    <Button type="link" href="/login" >
                        Login
                    </Button>
                    <Button type="link" href="/register" >
                        Sign up
                    </Button>
                </Flex>
            )}
        </>
    )
}