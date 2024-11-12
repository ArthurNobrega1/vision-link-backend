import CustomError from "@shared/errors/CustomError";
import IUsersRepository from "../repositories/IUsersRepository";

interface IGetUserService {
    usersRepository: IUsersRepository
    userId: string
}

export default class GetUserService {
    private usersRepository: IUsersRepository
    private userId: string

    constructor({ usersRepository, userId }: IGetUserService) {
        this.usersRepository = usersRepository
        this.userId = userId
    }

    public async execute() {
        const user = await this.usersRepository.findOne({ _id: this.userId })

        if (!user) {
            throw new CustomError('Só usuários autenticados podem alterar seu avatar', 403)
        }

        return user
    }
}