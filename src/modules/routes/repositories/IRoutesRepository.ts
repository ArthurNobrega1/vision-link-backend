import { Types } from "mongoose"
import IRouteDTO from "../dto/IRouteDTO"

interface IRoutesRepository {
    find(data: {}): Promise<IRouteDTO[]>
    create(data: IRouteDTO): Promise<IRouteDTO>
    deleteMany(filter: { userId: string | Types.ObjectId }): Promise<{ deletedCount: number }>
}

export default IRoutesRepository