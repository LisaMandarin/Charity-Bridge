import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function OAuthFailure() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => navigate('/login'), 3000)
    }, [])
    return (
        <>
            <p className="flex justify-center m-8 text-3xl">Login failed!  Try again later.  Redirecting...</p>
        </>
    )
}