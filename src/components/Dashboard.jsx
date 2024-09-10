import { useEffect, useState } from "react"
import { useUser } from "../lib/context/user"
import { Divider, message, Typography } from "antd"
import { DashboardName } from "./DashboardName"
import { DashboardPassword } from "./DashboardPassword"
import { DashboardAvatar } from "./DashboardAvatar"
const { Title, Link } = Typography

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
        <>
        { user.current ? (
            <>yes</>
        ) : (
            <div className="text-3xl text-center p-4">
                Please <Link className="text-3xl" href="/login">log in</Link> to see more information
            </div>
        )}
        </>
    )
}