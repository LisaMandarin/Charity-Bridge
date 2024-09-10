import { useEffect, useState } from "react"
import { useUser } from "../lib/context/user"
import { Divider, message, Typography } from "antd"
import { DashboardName } from "./DashboardName"
import { DashboardPassword } from "./DashboardPassword"
import { DashboardAvatar } from "./DashboardAvatar"
const { Title } = Typography

export function Dashboard() {
    const user = useUser()
    const [ email, setEmail ] = useState()

    useEffect(() => {
        if (user.current) {
            setEmail(user.current.email)
        }
    }, [])

    useEffect(() => {
        if (user.success) {
            message.success(user.success)
        }
        if (user.error) {
            message.error(user.error)
        }
    })

    return (
        <div className="p-4 bg-white w-fit mx-auto">
            <Title
                className="text-center"
            >
                {email}
            </Title>
            <DashboardAvatar />
            <Divider orientation="left" orientationMargin="0">
                <span className="text-gray-300">Update Name</span>
            </Divider>
            <DashboardName 
                user={user}
            />
            <Divider orientation="left" orientationMargin="0">
                <span className="text-gray-300">Update Password</span>
            </Divider>
            <DashboardPassword 
                user={user}
            />
        </div>
    )
}