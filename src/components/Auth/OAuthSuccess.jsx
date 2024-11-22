import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function OauthSuccess() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => navigate('/'), 3000)
    }, [])
    return (
        <>
            <p className="flex justify-center m-8 text-3xl">Login successful!  Redirecting...</p>
        </>
    )
}