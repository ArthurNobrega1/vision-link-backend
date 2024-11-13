import { Types } from "mongoose"
import IUserDTO from "../dto/IUserDTO"

interface IUsersRepository {
    find(data: {}): Promise<IUserDTO[]>
    findById(id: string | Types.ObjectId): Promise<IUserDTO | null>
    findOne(data: Partial<IUserDTO>): Promise<IUserDTO | null>
    create(data: Omit<IUserDTO, "_id">): Promise<Omit<IUserDTO, "_id">>
    findByIdAndUpdate(id: string, data: Partial<Omit<IUserDTO, "_id">>, options?: { new: boolean }): Promise<IUserDTO | null>
    findByIdAndDelete(id: string | Types.ObjectId): Promise<IUserDTO | null>
}

export default IUsersRepository