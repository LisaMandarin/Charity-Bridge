import { useParams } from "react-router-dom"
import { account } from "../lib/appwrite"
import { useEffect, useState } from "react"
import { useUser } from "../lib/context/user"
import { Typography } from "antd"
const { Link } = Typography

export function Verification() {
    const { userId, secret } = useParams()
    const [ success, setSuccess ] = useState(null)
    const [ error, setError ] = useState(null)
    const user = useUser()

    useEffect(() => {
        const verifyEmail = async() => {
            setSuccess(null)
            setError(null)
            try {
                const result = await account.updateVerification(
                    userId,
                    secret
                )
                console.log('result of updateVerification: ', result)
                setSuccess('Email verification done')
            } catch (err) {
                console.error('Failed to verify email: ', err.message)
                setError('Failed to verify Email')
            }
        }
        verifyEmail()
    }, [userId, secret])

    useEffect(() => {
        console.log('success: ', success)
        console.log('error: ', error)
    }, [success, error])
    return (
        user.current ? (
            <div className="flex w-full h-full text-3xl justify-center">
                { success && (
                    <div className="m-5">
                        {success}
                    </div>
                ) }
                { error && (
                    <div className="m-5">
                        {error}
                    </div>
                ) }
            </div>
        ) : (
            <div>
                <p>Please <Link href="/login">log in</Link> your account to verify your email</p>
            </div>
        )
    )
}

