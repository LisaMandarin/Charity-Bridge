import { HomePost } from "./HomePost";
import { HomeReview } from "./HomeReview";
import { HomeNeed } from "./HomeNeed";
import { HomeHero } from "./HomeHero";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../lib/serverAppwrite";

export function Home() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const result = await getAllUsers();
        setAllUsers(result);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchAllUsers();
  }, []);

  return (
    <div className=" w-full h-full flex flex-col flex-grow relative">
      <HomeHero />
      <div className="grid grid-cols-1 lg:grid-cols-4 md:mx-4 lg:mx-8 relative z-0 flex-grow">
        <div className="flex flex-col order-2 lg:order-1 lg:col-span-1">
          <HomeNeed allUsers={allUsers} />
          <HomeReview allUsers={allUsers} />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-3">
          <HomePost />
        </div>
      </div>
    </div>
  );
}
