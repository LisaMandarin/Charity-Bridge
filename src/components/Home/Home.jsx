import { HomePost } from "./HomePost";
import { HomeReview } from "./HomeReview";
import { HomeNeed } from "./HomeNeed";
import { HomeHero } from "./HomeHero";
import { useEffect, useState } from "react";

export function Home() {
  return (
    <div className=" w-full h-full flex flex-col flex-grow relative">
      <HomeHero />
      <div className="grid grid-cols-1 lg:grid-cols-4 md:mx-4 lg:mx-8 relative z-0 flex-grow">
        <div className="flex flex-col order-2 lg:order-1 lg:col-span-1">
          <HomeNeed />
          <HomeReview />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-3">
          <HomePost />
        </div>
      </div>
    </div>
  );
}
