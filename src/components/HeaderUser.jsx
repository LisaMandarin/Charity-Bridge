import { Flex, Button, Typography } from "antd"
import { useUser } from "../lib/context/user"
import '../output.css'

export function HeaderUser() {
    const user = useUser()
    return (
        <>
            { user.current ? (
                <Flex vertical align="center" justify="center" className="p-1 h-full border-solid border-4 border-pink-200" gap={16}>
                    <div>Hello, {user.current.name}</div>
                    <Button
                        type="link"
                        onClick={() => user.logout()}
                    >
                        Logout
                    </Button>
                </Flex>
            ) : (
                <Flex vertical align="center" justify="center" className="p-1 h-full border-solid border-4 border-pink-200" gap={16}>
                    <Button type="link" href="/login">
                        Login
                    </Button>
                    <Button type="link" href="/register">
                        Sign up
                    </Button>
                </Flex>
            )}
        </>
    )
}