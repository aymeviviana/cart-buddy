import { Db, MongoClient } from "mongodb";
const connectionString: string = process.env.ATLAS_URI || "";
const client: MongoClient = new MongoClient(connectionString);

let conn: MongoClient | undefined;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}


let db: Db | undefined;
if (conn) { 
  db = conn.db("shop_buddy");
} else {
  throw new Error("Failed to connect to the database.");
}

export default db;
