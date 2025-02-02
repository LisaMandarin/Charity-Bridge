import { useParams } from "react-router-dom";
import { ProfileCard } from "./Product/ProfileCard";
import { LeftArrowBar } from "./utils/ArrowBar";
import { useEffect, useState } from "react";
import useGetUser from "./utils/useGetUser";

export function ProfilePage() {
  const { userId } = useParams();
  const userData = useGetUser(userId);
  const [receiver, setReceiver] = useState();
  const [contributor, setContributor] = useState();

  useEffect(() => {
    if (userId) {
      setReceiver(userId);

      if (userData?.name) {
        setContributor({
          name: userData?.name,
          avatarUrl: userData?.avatar || null,
          id: userData?.userId,
          profileId: userData?.$id,
        });
      }
    }
  }, [userId, userData]);

  useEffect(() => {
    console.log("receiver: ", receiver);
    console.log("contributor: ", contributor);
  }, [receiver, contributor]);
  return (
    <div className="w-full">
      <LeftArrowBar />
      <div className="flex justify-center">
        <ProfileCard
          contributor={contributor}
          isOpen={true}
          receiver={receiver}
        />
      </div>
    </div>
  );
}
