import pg from "pg";
import dotenv from "dotenv";

const { Client } = pg

dotenv.config();

export async function getClient(){
    const client = new Client(`${process.env.DATABASE_URL}`);
    await client.connect();
    return client;
}
