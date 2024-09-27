import { useEffect, useState } from "react"
import { useUser } from "../lib/context/user"
import { Divider, message, Typography } from "antd"
import { DashboardName } from "./DashboardName"
import { DashboardPassword } from "./DashboardPassword"
import { DashboardAvatar } from "./DashboardAvatar"
import { DashboardEmail } from "./DashboardEmail"
import { DashboardPost } from "./DashboardPost"
const { Link } = Typography

export function Dashboard() {
    const user = useUser()
    
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
        { user.current ? (
            <div className="p-4 bg-white w-fit mx-auto">
                <DashboardEmail />
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
                <Divider orientation="left" orientationMargin="0">
                    <span className="text-gray-300">Post</span>
                </Divider>
                <DashboardPost />
            </div>
        ) : (
            <div className="text-3xl text-center p-4">
                Please <Link className="text-3xl" href="/login">log in</Link> to see more information
            </div>
        )}
        {/* <div className="p-4 bg-white w-fit mx-auto">
            <Divider orientation="left" orientationMargin="0">
                <span className="text-gray-300">Post</span>
            </Divider>
            <DashboardPost />
        </div> */}
        </>
    )
}