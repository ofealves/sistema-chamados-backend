import { Schema, model, connection, Types } from "mongoose";

export type LogsType = {
    action: string;
    userId: Types.ObjectId;
    ticketId: Types.ObjectId;
    details?: string;
    createdAt?: Date;
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
    }
);

const modelName = "Logs";

export default model<LogsType>("Logs", LogsSchema);