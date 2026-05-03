import mongoose, {Schema, Document } from "mongoose"


export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    isVerifiedEmail: boolean;
    otp?: string;
    otpExpiresAt?: Date;
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
    },
    isVerifiedEmail: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otpExpiresAt: {
        type: Date
    }


}, {timestamps: true})

const userModel = mongoose.models.User || mongoose.model("User", userSchema)
export default userModel;