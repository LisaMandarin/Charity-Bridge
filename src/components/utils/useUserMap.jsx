import { useEffect, useState } from "react";
import { useUserProfile } from "../../lib/context/userProfile";

export default function useUserMap({ targetedDocs, attribute }) {
  const { getProfiles } = useUserProfile();
  const [allProfiles, setAllProfiles] = useState([]);
  const [userMap, setUserMap] = useState();

  useEffect(() => {
    async function fetchAllProfiles() {
      try {
        const profileResult = await getProfiles();

        if (!profileResult || profileResult.length === 0) {
          console.error("Unable to fetch profiles");
        }
        setAllProfiles(profileResult);
      } catch (error) {
        console.error("Failed to fetch profiles: ", error.message);
      }
    }

    fetchAllProfiles();
  }, []);

  useEffect(() => {
    function fetchTargetedProfiles() {
      const needUserIDs = new Set(targetedDocs.map((doc) => doc[attribute]));

      const needProfiles = allProfiles.filter((profile) =>
        needUserIDs.has(profile.userId),
      );

      let map = new Map();
      if (needProfiles) {
        needProfiles.map((profile) => map.set(profile.userId, profile));
      }
      setUserMap(map);
    }

    fetchTargetedProfiles();
  }, [allProfiles, targetedDocs, attribute]);

  return userMap;
}
