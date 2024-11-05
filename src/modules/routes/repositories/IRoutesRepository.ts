import IRouteDTO from "../dto/IRouteDTO"

interface IRoutesRepository {
    find(data: {}): Promise<IRouteDTO[]>
    create(data: IRouteDTO): Promise<IRouteDTO>
}

export default IRoutesRepository