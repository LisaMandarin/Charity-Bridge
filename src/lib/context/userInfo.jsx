import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

export const IDEAS_DATABASE_ID = "66c45c1d003ba7168733";
export const USERS_COLLECTION_ID = "66d06b30002a14a44486";

const UserInfoContext = createContext();

export function useUserInfos() {
    return useContext(UserInfoContext);
}

export function UserInfosProvider(props) {
    const [ infos, setInfos ] = useState([]);

    async function fetchData() {
        try {
            const response = await databases.listDocuments(
                IDEAS_DATABASE_ID,
                USERS_COLLECTION_ID,
                [
                    Query.orderDesc('$createdAt'),
                ]
            )
            setInfos(response.documents)
        } catch (error) {
            console.error('Failed to fetch user information: ', error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    async function add(info) {
        try {
            if (!info.userID) {
                throw new Error("Missing required attribute 'userID")
            }
        const response = await databases.createDocument(
            IDEAS_DATABASE_ID,
            USERS_COLLECTION_ID,
            ID.unique(),
            info
        )
        setInfos(current => [response, ...current])
        } catch (error) {
            console.error('Failed to add info: ', error)
        }
    }

    async function remove(documentId) {
        try {
            await databases.deleteDocument(
                IDEAS_DATABASE_ID,
                USERS_COLLECTION_ID,
                documentId)
                setInfos(infos => infos.filter(info => info.$id !==documentId))    
        } catch (error) {
            console.error('Failed to remove info: ', error)
        }
    }

    async function update(documentId, updatedInfo) {
        try {
            const response = await databases.updateDocument(
                IDEAS_DATABASE_ID,
                USERS_COLLECTION_ID,
                documentId,
                updatedInfo,
            )
            setInfos(current => current.map(info => {
                info.$id === documentId ? {
                    ...info, ...updatedInfo
                } : info
            }))
        } catch (error) {
            console.error('Failed to update info: ', error)
        }
    }

    async function get(documentId) {
        try {
            await databases.getDocument(
                IDEAS_DATABASE_ID,
                USERS_COLLECTION_ID,
                documentId,
            )
        } catch (error) {
            console.error('Failed to get info: ', error)
        }
    }

    return (
        <UserInfoContext.Provider value={{ current: infos, add, remove, update, get}}>
            {props.children}
        </UserInfoContext.Provider>
    )
}