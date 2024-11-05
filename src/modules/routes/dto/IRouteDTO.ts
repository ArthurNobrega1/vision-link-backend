import { Types } from "mongoose"

interface IRouteDTO {
    userId: string | Types.ObjectId
    locationStart: {
        latitude: number
        longitude: number
    }
    locationEnd: {
        latitude: number
        longitude: number
    }
    createdAt?: Date
    updatedAt?: Date
}

export default IRouteDTO