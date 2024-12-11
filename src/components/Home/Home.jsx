import { HomePost } from "./HomePost";
import { HomeReview } from "./HomeReview";
import { HomeNeed } from "./HomeNeed";
import { HomeHero } from "./HomeHero";

export function Home() {
  return (
    <div className="relative">
      <HomeHero />
      <div className="grid sm:grid-cols-[1fr_2fr_1fr] md:mx-4 lg:mx-8 relative z-0">
        <div className="order-2 sm:order-1">
          <HomeReview />
        </div>
        <div className="order-1 sm:order-2 flex flex-col justify-start items-center">
          <HomePost />
        </div>
        <div className="order-3">
          <HomeNeed />
        </div>
      </div>
    </div>
  );
}
