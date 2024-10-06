import { Client, Databases, Account, OAuthProvider, Storage } from "appwrite";

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66abbd80001d74153b78')

export const account = new Account(client);
export { OAuthProvider }
export const storage = new Storage(client)
export const productInfoDatabase = new Databases(client);
export const productStorage = new Storage(client);
export const userProfileDatabase = new Databases(client);