import { useUser } from "../lib/context/user"
import { UserForm } from "./UserForm"

export function Home() {
    const user = useUser()

    return (
        <>
        { user.current ? (
            <>
                <UserForm></UserForm>
            </>
        ) : (
            <>
            <span>You have logged out</span>
            </>
        )
        }
        </>
    )
}