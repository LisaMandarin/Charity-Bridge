import { useUser } from "../lib/context/user"
import { HomePost } from "./HomePost"
import { HomeReview } from "./HomeReview"
import { HomeNeed } from "./HomeNeed"
import { Link } from "react-router-dom"

export function Home() {
    const user = useUser()

    return (
        <>
        { user.current ? (
            <div
                className="grid sm:grid-cols-[1fr_2fr_1fr] md:mx-4 lg:mx-8"
            >
                <HomeReview />
                <HomePost />
                <HomeNeed />
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