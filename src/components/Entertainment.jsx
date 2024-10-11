import { useUser } from "../lib/context/user"
import { Spin } from "antd"
import { SessionFailure } from "./SessionFailure"

export function Entertainment() {
    const user = useUser()

    if (user.loading) {
        return (
            <Spin size="large" spinning={user.loading} fullscreen />
        )
    }

    if (!user.current) {
        return (
            <SessionFailure />
        )
    }

    return (
        <>
            <p>This is Entertainment component</p>
        </>
    )
}