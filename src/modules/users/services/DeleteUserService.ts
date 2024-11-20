import CustomError from "@shared/errors/CustomError";
import IUsersRepository from "../repositories/IUsersRepository";
import IRoutesRepository from "@modules/routes/repositories/IRoutesRepository";

interface IDeleteUserService {
    usersRepository: IUsersRepository
    routesRepository: IRoutesRepository
    userId: string
}

export default class DeleteUserService {
    private usersRepository: IUsersRepository
    private routesRepository: IRoutesRepository
    private userId: string

    constructor({ usersRepository, userId, routesRepository }: IDeleteUserService) {
        this.usersRepository = usersRepository
        this.routesRepository = routesRepository
        this.userId = userId
    }

    public async execute() {
        const user = await this.usersRepository.findByIdAndDelete(this.userId)

        if (!user) {
            throw new CustomError('Usuário não encontrado', 404)
        }

        await this.routesRepository.deleteMany({ userId: this.userId })
    }
}