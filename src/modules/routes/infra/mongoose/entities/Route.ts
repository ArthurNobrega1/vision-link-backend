import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
}, { _id: false })

const routeSchema = new mongoose.Schema({
    locationStart: {
        type: locationSchema,
        required: true
    },
    locationEnd: {
        type: locationSchema,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Route', routeSchema)