import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    favourites: {
        type: [String],
        default: [],
    },
});

const User = mongoose?.models?.User || mongoose.model("User", UserSchema);

export default User;