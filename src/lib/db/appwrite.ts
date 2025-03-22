import { Client, Databases, Storage, ID } from "appwrite";

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67dc88c700014435691f");

const storage = new Storage(client);
const db = new Databases(client);
export { storage, db, ID };
