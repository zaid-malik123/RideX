import mongoose from "mongoose";


const db_Url = process.env.MONGO_URL;


if(!db_Url) throw new Error("data base url not found");

let cached = global.mongoose;

if(!cached) {

    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}

export const connectDb = async () => {

    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.promise) {
        cached.promise = mongoose.connect(db_Url).then(c => c.connection)
    }


    try {

        const conn = await cached.promise;
        return conn;
        
    } catch (error: unknown) {

        console.log(error)

        if(error instanceof Error) {
            throw new Error("Db connection time error ", error)
        }
    }
}