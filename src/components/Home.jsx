import { HomePost } from "./HomePost"
import { HomeReview } from "./HomeReview"
import { HomeNeed } from "./HomeNeed"



export function Home() {
    return (
        <div className="grid sm:grid-cols-[1fr_2fr_1fr] md:mx-4 lg:mx-8">
            <HomeReview />
            <HomePost />
            <HomeNeed />
        </div>
    )
}