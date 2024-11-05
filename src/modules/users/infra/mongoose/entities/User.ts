import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    avatar: {
        type: String,
        default: null
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
