import { Schema, model } from "mongoose";

type UserType = {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
}

const userSchema = new Schema<UserType>(
    {
        email: {
            type: String,
            match: [/^\S+@\S+\.\S+$/, "Email inválido"],
            required: true,
        },
        name: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "user",],
            default: "user"
        },
    }
);

export default model<UserType>("User", userSchema);
