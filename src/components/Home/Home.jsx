import { HomePost } from "./HomePost"
import { HomeReview } from "./HomeReview"
import { HomeNeed } from "./HomeNeed"

export function Home() {
    return (
        <div className="grid sm:grid-cols-[1fr_3fr_1fr] sm:mx-4 lg:mx-8">
            <div className="order-2 sm:order-1">
                <HomeReview />
            </div>
            <div className="order-1 sm:order-2">
                <HomePost />
            </div>
            <div className="order-3">
                <HomeNeed />      
            </div>
        </div>
    )
}