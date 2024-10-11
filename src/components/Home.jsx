import { useUser } from "../lib/context/user"
import { HomePost } from "./HomePost"
import { HomeReview } from "./HomeReview"
import { HomeNeed } from "./HomeNeed"
import { Spin } from "antd"
import { SessionFailure } from "./SessionFailure"


export function Home() {
    const user = useUser()

    if (user.loading) {
        console.log('home loading...')
        return (
            <Spin size="large" spinning={user.loading} fullscreen />
        )
    }

    if (!user.current) {
        return (
            <SessionFailure />
        )
    }

    return (
        <div className="grid sm:grid-cols-[1fr_2fr_1fr] md:mx-4 lg:mx-8">
            <HomeReview />
            <HomePost />
            <HomeNeed />
        </div>
    )
}