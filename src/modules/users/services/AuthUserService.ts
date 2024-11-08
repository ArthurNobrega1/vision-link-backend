import CustomError from "@shared/errors/CustomError"
import IUsersRepository from "@modules/users/repositories/IUsersRepository"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { configDotenv } from "dotenv"
configDotenv()

interface IAuthUserService {
    usersRepository: IUsersRepository
    data: {
        email?: string
        username?: string
        password: string
    }
}

const normalizeString = (input: string) => {
    return input
        .toLowerCase() // Converte para minúsculas
        .normalize("NFD") // Descompõe caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
}

export default class AuthUserService {
    private usersRepository: IUsersRepository
    private data: {
        email?: string
        username?: string
        password: string
    }

    constructor({ usersRepository, data }: IAuthUserService) {
        this.usersRepository = usersRepository
        this.data = data
    }

    public async execute() {
        if ((!this.data.username && !this.data.email) || !this.data.password) {
            throw new CustomError('Preencha todos os campos obrigatórios', 400)
        }

        let userByEmail, userByUsername
        if (this.data.email) {
            const normalizedEmail = normalizeString(this.data.email)

            userByEmail = await this.usersRepository.findOne({ email: normalizedEmail })
        }

        if (this.data.username) {
            const normalizedUsername = normalizeString(this.data.username)

            userByUsername = await this.usersRepository.findOne({ username: normalizedUsername })
        }

        const user = userByEmail ? userByEmail : userByUsername

        if (!user) {
            throw new CustomError("Email/nome de usuário ou senha inválidos", 400)
        }

        const passwordMatched = await compare(this.data.password, user.password.toString())

        if (!passwordMatched) {
            throw new CustomError("Email/nome de usuário ou senha inválidos", 400)
        }

        const tokenSecret = process.env.TOKEN_SECRET
        if (!tokenSecret) {
            throw new CustomError("TOKEN_SECRET não está definido", 500)
        }

        const token = sign({}, tokenSecret, {
            expiresIn: '1h',
            subject: user._id.toString()
        })

        return { user, token }
    }
}