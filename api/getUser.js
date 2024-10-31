import {Client, Users} from 'node-appwrite'

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
const projectId = import.meta.env.VITE_APPWRITE_PROJECT
const apiKey = import.meta.env.VITE_APPWRITE_API_KEY

const client = new Client()
    .setEndpoint(endpoint) // Your API Endpoint
    .setProject(projectId) // Your project ID
    .setKey(apiKey); // Your secret API key

const users = new Users(client);

export async function getUser(userId) {
    try {
        const result = await users.get(userId);
        
        if (!result) {
            throw new Error("No result found during getUser")
        }
        return result
    } catch (error) {
        console.error('Failed to get user: ', error.message)
        return null
    }
}


