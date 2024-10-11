// import { Link } from "react-router-dom"
import { Typography } from "antd"
const { Link } = Typography

export function SessionFailure() {

    return (
        <>
              <div className="text-3xl text-center p-4">Please <Link href="/login" className="text-3xl">log in</Link> to see more information</div>
            </>
    )
}