import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, token: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    }
}, { timestamps: true });

export default mongoose.model('UserToken', userTokenSchema);
