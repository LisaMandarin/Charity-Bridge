import { Flex, Button, Typography, Avatar } from "antd"
import { useUser } from "../lib/context/user"
import { UserOutlined } from "@ant-design/icons"
const { Link } = Typography

export function HeaderUser() {
    const user = useUser()

    return (
        <>
            { user.current ? (
                <div className="w-fit flex flex-row justify-around p-1 h-full border-4 border-pink-200">
                    <Avatar size={60} icon={<UserOutlined />} className="my-auto"/>
                    <Flex 
                        vertical 
                        align="flex-end" 
                        justify="flex-end" 
                    >
                        <p ><Link href="/dashboard">Hello, {user.current.name}</Link></p>
                        <p><Link href="#" onClick={() => user.logout()}>Logout</Link></p>
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