import { Flex, Button } from "antd"
import { useUser } from "../lib/context/user"

export function HeaderUser() {
    const user = useUser()
    return (
        <>
            { user.current ? (
                <Flex 
                    vertical 
                    align="center" 
                    justify="center" 
                    className="p-1 h-full border-solid border-4 border-pink-200" 
                    gap={16}>
                    <p>Hello, {user.current.name}</p>
                    <p>Dashboard</p>
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