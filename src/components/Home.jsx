import { useUser } from "../lib/context/user"

import { Link } from "react-router-dom"

export function Home() {
    const user = useUser()

    return (
        <>
        { user.current ? (
            <div
                className="p-4"
            >
                This is homepage
            </div>
        ) : (
            <>
                <div className="text-3xl text-center p-4">Please <Link to="/login">log in</Link> to see more information</div>
            </>
        )
        }
        </>
    )
}