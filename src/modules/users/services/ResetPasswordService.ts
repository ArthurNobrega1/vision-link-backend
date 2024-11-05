import CustomError from "@shared/errors/CustomError";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";
import { hash } from "bcryptjs";
import { isAfter, addHours } from "date-fns";

interface IUpdateUserAvatarService {
    usersRepository: IUsersRepository
    userTokensRepository: IUserTokensRepository
}

interface IRequest {
    token: string
    password: string
}

const isPasswordValid = (password: string): boolean => {
    const hasRepeatingCharacters = /(.)\1{2,}/.test(password) // Verifica caracteres repetidos
    const hasSequentialCharacters = /(012|123|234|345|456|567|678|789|0ab|1bc|2cd|3de|4ef|5fg|6gh|7hi|8ij|9jk|0za|1ab|2bc|3cd|4de|5ef|6fg|7gh|8hi|9ij)/i.test(password)

    return !hasRepeatingCharacters && !hasSequentialCharacters
}

export default class ResetPasswordService {
    private usersRepository: IUsersRepository
    private userTokensRepository: IUserTokensRepository

    constructor({ usersRepository, userTokensRepository }: IUpdateUserAvatarService) {
        this.usersRepository = usersRepository
        this.userTokensRepository = userTokensRepository
    }

    public async execute({ token, password }: IRequest) {
        if (!token || !password) {
            throw new CustomError('Preencha todos os campos obrigatórios', 400)
        }

        if (password.length < 5) {
            throw new CustomError("Senha deve ter pelo menos 5 caracteres", 400)
        }

        if (!isPasswordValid(password.toString())) {
            throw new CustomError("Senha com caracteres repetidos ou sequenciais", 400)
        }

        const userToken = await this.userTokensRepository.findByToken(token)

        if (!userToken) {
            throw new CustomError('Token do usuário não existe', 400)
        }

        const user = await this.usersRepository.findById(userToken.userId.toString())

        if (!user) {
            throw new CustomError('Usuário não existe', 400)
        }

        const tokenCreatedAt = userToken.createdAt
        const compareDate = addHours(tokenCreatedAt, 2)

        if (isAfter(Date.now(), compareDate)) {
            throw new CustomError('Token expirado', 400)
        }

        const hashedPassword = await hash(password.toString(), 8)
        user.password = hashedPassword

        await this.usersRepository.findByIdAndUpdate(user._id, user, { new: true })
    }
}