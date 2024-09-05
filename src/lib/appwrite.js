import { Client, Databases, Account, OAuthProvider } from "appwrite";

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66abbd80001d74153b78')

export const account = new Account(client);
export const databases = new Databases(client);
export { OAuthProvider }