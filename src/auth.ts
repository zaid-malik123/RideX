import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ApiError } from "./lib/ApiError";
import { connectDb } from "./lib/db";
import userModel from "./models/user.model";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      async authorize(credentials) {
        if(!credentials.email || !credentials.password) {
          throw new ApiError("missing credintials ", 400)
        }

        await connectDb();

        const user = await userModel.findOne({
          email: credentials.email
        })

        if(!user) {
          throw new ApiError("User not found please create your account firstly", 400)
        }

        const compare = await bcrypt.compare(credentials.password as string, user.password)

        if(!compare) {
          throw new ApiError("Password is invalid ", 400)
        }

        return {
           id: user._id,
           name: user.name,
           email: user.email,
           role: user.role
        }
      }
    }),
  ],
});
