import { useEffect } from "react"
import { useUser } from "../lib/context/user"
import { message } from "antd"
import { DashboardName } from "./DashboardName"
import { DashboardPassword } from "./DashboardPassword"

export function Dashboard() {
    const user = useUser()

    useEffect(() => {
        if (user.success) {
            message.success(user.success)
        }
        if (user.error) {
            message.error(user.error)
        }
    })

    return (
        <>
        <DashboardName 
            user={user}
        />
        <DashboardPassword 
            user={user}
        />
        </>
    )
}