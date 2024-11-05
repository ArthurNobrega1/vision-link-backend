import { Types } from "mongoose"

interface IUserTokenDTO {
    _id: string | Types.ObjectId
    userId: String | Types.ObjectId
    token: String | Types.ObjectId
    createdAt: Date
    updatedAt?: Date
}

export default IUserTokenDTO