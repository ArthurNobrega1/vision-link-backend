import CustomError from "@shared/errors/CustomError"
import IRouteDTO from "../dto/IRouteDTO"
import IRoutesRepository from "../repositories/IRoutesRepository"
import IUsersRepository from "@modules/users/repositories/IUsersRepository"

interface ICreateRouteService {
    routesRepository: IRoutesRepository
    usersRepository: IUsersRepository
    data: Omit<IRouteDTO, 'userId'>
    id: string
}

export default class CreateRouteService {
    private routesRepository: IRoutesRepository
    private usersRepository: IUsersRepository
    private data: Omit<IRouteDTO, 'userId'>
    private id: string

    constructor({ routesRepository, usersRepository, data, id }: ICreateRouteService) {
        this.routesRepository = routesRepository
        this.usersRepository = usersRepository
        this.data = data
        this.id = id
    }

    public async execute() {
        const hasUser = await this.usersRepository.findById(this.id)

        if (!hasUser) {
            throw new CustomError('Só usuários autenticados podem criar rotas', 403)
        }

        if (!this.data.locationStart || !this.data.locationEnd) {
            throw new CustomError('Localização inicial e final são obrigatórias', 400)
        }

        const { latitude: startLat, longitude: startLng } = this.data.locationStart;
        if (typeof startLat !== 'number' || typeof startLng !== 'number') {
            throw new CustomError('Coordenadas da localização inicial com formato inválido', 400)
        }

        const { latitude: endLat, longitude: endLng } = this.data.locationEnd;
        if (typeof endLat !== 'number' || typeof endLng !== 'number') {
            throw new CustomError('Coordenadas da localização final com formato inválido', 400)
        }

        const route = await this.routesRepository.create({
            locationStart: this.data.locationStart,
            locationEnd: this.data.locationEnd,
            userId: this.id
        })
        return route
    }
}