import { useEffect, useState } from "react";
import { getAllUsers } from "../../lib/serverAppwrite";

export default function useTest() {
  const [allUsers, setAllUsers] = useState(); // retrieve all user infos from account collection
  const [targetedUserInfos, setTargetedUserInfos] = useState([]); // retrieve targeted user infos

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const result = await getAllUsers();
        console.log("result: ", result);
        if (!result || result.length === 0) {
          console.warn("No data returned from getAllUsers");
        }
        setAllUsers(result);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchAllUsers();
  }, []);

  useEffect(() => {
    async function fetchTargetedUserInfos() {
      try {
        if (
          !allUsers ||
          allUsers.length === 0 ||
          !targetedDocuments ||
          targetedDocuments.length === 0
        ) {
          return; // Wait for allUsers to load
        }
        const userList = new Set(
          targetedDocuments.map((doc) => doc[attribute]),
        ); // retrieve the IDs from targeted documents

        const filteredUsers = allUsers.filter((user) => userList.has(user.$id)); // retrieve user infos from account collection

        const userMap = new Map(filteredUsers.map((user) => [user.$id, user]));

        const data = targetedDocuments.map((doc) =>
          userMap.get(doc[attribute]),
        );
        setTargetedUserInfos(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchTargetedUserInfos();
  }, [allUsers, targetedDocuments, attribute]);

  useEffect(() => {
    console.log("allUsers: ", allUsers);
  }, [allUsers]);

  return { targetedUserInfos };
}
