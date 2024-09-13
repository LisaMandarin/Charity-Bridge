import { Button, Typography } from "antd"
import { useUser } from "../lib/context/user"
import { useState, useEffect } from "react"
const { Title } = Typography

export function DashboardEmail() {
    const user = useUser()
    const [ email, setEmail ] = useState('')
    const [ isVerified, setIsVerified ] = useState(false)

    useEffect(() => {
        if (user.current) {
            setEmail(user.current.email)
        }
    }, [user.current])

    useEffect(() => {
        if (user.current.emailVerification === false) {
            setIsVerified(false)
        }
        if (user.current.emailVerification === true) {
            setIsVerified(true)
        }
    }, [user.current.emailVerification])

    return (
        <div className="text-center md:text-xl lg:text-2xl">
            <div className="inline ">
                {email}
            </div>
            { isVerified ? (
                ""
            ) : (
                <Button 
                    size="small"
                    onClick={user.emailVerification}
                >
                    Verify
                </Button>
            )}
        </div>
    )
}

