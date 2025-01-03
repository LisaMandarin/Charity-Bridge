import { Client, Databases, Account, OAuthProvider, Storage } from "appwrite";

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT;
const client = new Client();
client.setEndpoint(endpoint).setProject(projectId);

export const account = new Account(client);
export { OAuthProvider };
export const avatarStorage = new Storage(client);
export const productStorage = new Storage(client);
export const charityDatabase = new Databases(client);

export default client;
