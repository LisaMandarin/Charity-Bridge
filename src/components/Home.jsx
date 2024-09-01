import { Flex } from "antd"
import { useUser } from "../lib/context/user"
import { UserForm } from "./UserForm"
import { Link } from "react-router-dom"
import "../output.css"

export function Home() {
    const user = useUser()

    return (
        <>
        { user.current ? (
            <>
                <UserForm />
            </>
        ) : (
            <>
                <div className="text-3xl text-center p-4">Please <Link to="/login">log in</Link> to see more information</div>
            </>
        )
        }
        </>
    )
}