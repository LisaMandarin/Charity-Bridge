import { useMediaQuery } from "react-responsive"
import { HomePost } from "./HomePost"
import { HomeReview } from "./HomeReview"
import { HomeNeed } from "./HomeNeed"

export function Home() {
    const isMobile = useMediaQuery({maxWidth: 640})

    return (
        <div className="grid sm:grid-cols-[1fr_3fr_1fr] sm:mx-4 lg:mx-8">
            { isMobile ? (
                <>
                    <HomePost />
                    <HomeReview />
                    <HomeNeed />
                </>
            ) : (
                <>
                    <HomeReview />
                    <HomePost />
                    <HomeNeed />
                </>
            )}
        </div>
    )
}