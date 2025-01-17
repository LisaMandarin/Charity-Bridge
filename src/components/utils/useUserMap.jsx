import { useEffect, useState } from "react";
import { getAllUsers } from "../../lib/serverAppwrite";

export default function useUserMap({ targetedDocuments, attribute }) {
  const [allUsers, setAllUsers] = useState([]);
  const [userMap, setUserMap] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers();
        if (!result || result.length === 0) {
          console.warn("No result returned from getAllUsers");
        }

        setAllUsers(result);
      } catch (error) {
        console.error("Failed to fetch users: ", error.message);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchTargetedUserInfos() {
      try {
        if (!allUsers || allUsers.length === 0) {
          console.warn("No allUsers data");
          return;
        }

        const userList = new Set(
          targetedDocuments.map((doc) => doc[attribute]),
        );
        const filteredUserInfos = allUsers.filter((info) =>
          userList.has(info.$id),
        );
        const map = new Map(filteredUserInfos.map((user) => [user.$id, user]));
        setUserMap(map);
      } catch (error) {
        console.error(
          "Failed to fetch targeted user information: ",
          error.message,
        );
      }
    }

    fetchTargetedUserInfos();
  }, [allUsers, targetedDocuments, attribute]);

  return userMap;
}
