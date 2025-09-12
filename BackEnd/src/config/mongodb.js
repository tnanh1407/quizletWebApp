import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment.js";

let demoDatabaseInstance = null;

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Conncet DataBase
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();

  demoDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

// Close All Connect
export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};

export const GET_DB = () => {
  if (!demoDatabaseInstance) throw new Error("Must Connect");
  return demoDatabaseInstance;
};
