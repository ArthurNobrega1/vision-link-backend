import CustomError from "@shared/errors/CustomError";
import IUsersRepository from "../repositories/IUsersRepository";

interface IDeleteUserService {
    usersRepository: IUsersRepository
    userId: string
}

export default class DeleteUserService {
    private usersRepository: IUsersRepository
    private userId: string

    constructor({ usersRepository, userId }: IDeleteUserService) {
        this.usersRepository = usersRepository
        this.userId = userId
    }

    public async execute() {
        const user = await this.usersRepository.findByIdAndDelete(this.userId)

        if (!user) {
            throw new CustomError('Usuário não encontrado', 404)
        }
    }
}