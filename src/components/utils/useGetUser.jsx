import { useEffect, useState } from "react";
import { useUserProfile } from "../../lib/context/userProfile";
export default function useGetUser(id) {
  const { getProfiles } = useUserProfile();
  const [user, setUser] = useState();
  useEffect(() => {
    async function fetchUser() {
      try {
        const result = await getProfiles();
        const user = result.find((profile) => profile.userId === id);
        setUser(user);
      } catch (error) {
        console.error("Failed to fetch profiles: ", error.message);
      }
    }
    fetchUser();
  }, [id]);
  return user;
}
