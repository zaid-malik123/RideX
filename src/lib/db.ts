import mongoose from "mongoose";


const db_Url = process.env.MONGO_URL;


if(!db_Url) throw new Error("data base url not found");


console.log("THIS IS THE DB URL ", db_Url)