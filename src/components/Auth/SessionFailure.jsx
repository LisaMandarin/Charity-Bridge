import { Link } from "react-router-dom"

export function SessionFailure() {

    return (
        <>
              <div className="text-3xl text-center p-4">Please <Link to="/login" className="text-3xl underline hover:text-blue-500 hover:no-underline">log in</Link> to see more information</div>
            </>
    )
}