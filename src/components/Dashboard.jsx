import { useEffect} from "react"
import { useUser } from "../lib/context/user"
import { Divider, message, Space } from "antd"
import { DashboardName } from "./DashboardName"
import { DashboardPassword } from "./DashboardPassword"
import { DashboardAvatar } from "./DashboardAvatar"
import { DashboardEmail } from "./DashboardEmail"
import { DashboardPost } from "./DashboardPost"
import { DashboardProfile } from "./DashboardProfile"

export function Dashboard() {
    const user = useUser()
    
    useEffect(() => {
        user.fetchUser()
    }, [])

    useEffect(() => {
        if (user.success) {
            message.success(user.success)
        }
        if (user.error) {
            message.error(user.error)
        }
    }, [user.success, user.error])

    return (
        <>
            <div className="p-4 bg-white w-fit mx-auto">
                <Space direction="vertical" size="large" className="w-full">
                    <DashboardEmail />
                    <DashboardAvatar />
                </Space>
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
                <Divider orientation="left" orientationMargin="0">
                    <span className="text-gray-300">Profile</span>
                </Divider>
                <DashboardProfile />
                <Divider orientation="left" orientationMargin="0">
                    <span className="text-gray-300">Post</span>
                </Divider>
                <DashboardPost />
            </div>
        </>
    )
}