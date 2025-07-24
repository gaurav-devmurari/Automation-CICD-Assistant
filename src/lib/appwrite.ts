import { Account, Client, Databases, Functions, Storage } from 'appwrite';
import { environment } from '../environments/environment'

export const appwriteClient = new Client();

appwriteClient
  .setEndpoint(environment.appwriteEndpoint)
  .setProject(environment.projectId);

export const account = new Account(appwriteClient);
export const functions = new Functions(appwriteClient);
export const database = new Databases(appwriteClient);
export const storage =
  typeof window !== 'undefined' ? new Storage(appwriteClient) : null;
export const projectId = environment.projectId;
export const databaseId = environment.databaseId;
export const collectionId = environment.collectionId;
export const pipelineLogTableId = environment.pipelineLogTableId;
export const bucketId = environment.bucketId;

export { ID } from 'appwrite';

