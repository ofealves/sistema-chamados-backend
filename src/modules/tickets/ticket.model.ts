import { Schema, model, connection, Types } from "mongoose";

type TicketType = {
    title: string;
    description: string;
    status: "open" | "in_progress" | "closed";
    priority: "low" | "medium" | "high";

    userId: Types.ObjectId;

    assignedTo?: string | null;
};

const TicketSchema = new Schema<TicketType>(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["open", "in_progress", "closed"],
            default: "open",
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        assignedTo: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const modelName = "Ticket";

const Ticket =
    connection && connection.models[modelName]
        ? connection.models[modelName]
        : model<TicketType>(modelName, TicketSchema);

export default Ticket;