import { Schema, model, Types } from "mongoose";

export type LogsType = {
    action: string;
    userId: Types.ObjectId;
    ticketId: Types.ObjectId;
    details?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

const LogsSchema = new Schema<LogsType>(
    {
        action: {
            type: String,
            required: true,
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        ticketId: {
            type: Schema.Types.ObjectId,
            ref: "Ticket",
            required: true,
        },

        details: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default model<LogsType>("Logs", LogsSchema);