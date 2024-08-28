import { useUser } from "../lib/context/user"

export function HeaderUser() {
    const user = useUser()
    return (
        <div>
            { user.current ? (
                <>
                    <span>Hello, </span>
                    <span>{user.current.email}</span>
                    <button
                        type="button"
                        onClick={() => user.logout()}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                <a href = "/login">Login</a>
                <br />
                <a href = "/register">Sign up</a>
                </>
            )}
        </div>
    )
}