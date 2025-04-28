import { Pool } from "pg";

const pool = new Pool(

    {
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: 'localhost',
        port: process.env.DATABASE_PORT,

    }

)