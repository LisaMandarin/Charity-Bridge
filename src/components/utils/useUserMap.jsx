import { useEffect, useState, useMemo } from "react";
import { useUserProfile } from "../../lib/context/userProfile";

export default function useUserMap({ targetedDocs, attribute }) {
  const { getProfiles } = useUserProfile();
  const [allProfiles, setAllProfiles] = useState([]);

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

  const userMap = useMemo(() => {
    if (!attribute || !allProfiles.length || !targetedDocs.length)
      return new Map();

    const needUserIDs = new Set(targetedDocs.map((doc) => doc[attribute]));

    const needProfiles = allProfiles.filter((profile) =>
      needUserIDs.has(profile.userId),
    );

    let map = new Map();
    if (needProfiles) {
      needProfiles.forEach((profile) => map.set(profile.userId, profile));
    }

    return map;
  }, [allProfiles, targetedDocs, attribute]);

  return userMap;
}
