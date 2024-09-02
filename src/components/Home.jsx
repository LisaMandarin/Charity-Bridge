import { useUser } from "../lib/context/user"
import { UserForm } from "./UserForm"
import { UserList } from "./UserList"
import { Link } from "react-router-dom"
import "../output.css"

export function Home() {
    const user = useUser()

    return (
        <>
        { user.current ? (
            <div
                className="p-4"
            >
                <UserForm />
                <br />
                <UserList />
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