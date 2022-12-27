import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 100,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    occupation: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    transactions: {
        type: Array,
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "admin",
    }
},
    { timestamps: true }

);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;