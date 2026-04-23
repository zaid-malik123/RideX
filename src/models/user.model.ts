import mongoose, {Schema, Document } from "mongoose"


interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "user" | "partner" | "admin",
    createdAt: Date;
    updatedAt: Date
}


const userSchema: Schema<IUser> = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user" , "partner" ,"admin"],
        default: "user"
    }


}, {timestamps: true})

const userModel = mongoose.models.User || mongoose.model("User", userSchema)
export default userModel;