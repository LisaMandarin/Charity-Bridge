import { useParams } from "react-router-dom"
import { account } from "../lib/appwrite"
import { useEffect, useState } from "react"

export function Verification() {
    const { userId, secret } = useParams()
    const [ success, setSuccess ] = useState(null)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        setSuccess(null)
        setError(null)
        try {
            const result = account.updateVerification(
                userId,
                secret
            )
            console.log('result of updateVerification: ', result)
            setSuccess('Email verification done')
        } catch (err) {
            console.error('Failed to verify email: ', err.message)
            setError('Failed to verify Email')
        }
    }, [userId, secret])

    return (
        <div className="flex w-full h-full text-3xl justify-center">
            { success ? (
                <div className="m-5">
                    {success}
                </div>
            ) : ""}
            { error ? (
                <div className="m-5">
                    {error}
                </div>
            ): ""}
        </div>
    )
}