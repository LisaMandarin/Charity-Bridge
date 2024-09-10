import { Flex, Button, Typography } from "antd"
import { useUser } from "../lib/context/user"
const { Link } = Typography

export function HeaderUser() {
    const user = useUser()

    return (
        <>
            { user.current ? (
                <Flex 
                    vertical 
                    align="center" 
                    justify="center" 
                    className="p-1 h-full leading-6 border-solid border-4 border-pink-200" 
                >
                    <p ><Link href="/dashboard">Hello, {user.current.name}</Link></p>
                    <Button
                        type="link"
                        onClick={() => user.logout()}
                    >
                        Logout
                    </Button>
                </Flex>
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