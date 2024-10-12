import { useUser } from "./context/user";
import { SessionFailure } from "../components/SessionFailure";
import { Spin } from "antd";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function ProtectedRoute({children}) {
    const user = useUser()
    const location = useLocation()
    
    useEffect(() => {
        user.fetchSession()
    }, [location, user.fetchSession])

    if (user.loading) {
    return (
        <Spin size="large" fullscreen />
    )
    }
    
    if (!user.isSession) {
        return (
            <SessionFailure />
        )
    }

    return children
}