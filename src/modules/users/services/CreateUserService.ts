import CustomError from "@shared/errors/CustomError"
import IUsersRepository from "@modules/users/repositories/IUsersRepository"
import IUserDTO from "../dto/IUserDTO"
import { hash } from "bcryptjs"

interface ICreateUserService {
    usersRepository: IUsersRepository
    data: Omit<IUserDTO, '_id'>
}

const normalizeString = (input: string) => {
    return input
        .toLowerCase() // Converte para minúsculas
        .normalize("NFD") // Descompõe caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
}

const isValidFullName = (fullName: string): boolean => {
    const fullNameRegex = /^[\p{L}]+$/u
    return fullNameRegex.test(fullName)
}

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^(?:\(\d{2}\)\s?\d{4,5}-?\d{4}|\d{2}\s?\d{4,5}-?\d{4}|\d{8,})$/;
    return phoneRegex.test(phone)
}

const isPasswordValid = (password: string): boolean => {
    const hasRepeatingCharacters = /(.)\1{2,}/.test(password) // Verifica caracteres repetidos
    const hasSequentialCharacters = /(012|123|234|345|456|567|678|789|0ab|1bc|2cd|3de|4ef|5fg|6gh|7hi|8ij|9jk|0za|1ab|2bc|3cd|4de|5ef|6fg|7gh|8hi|9ij)/i.test(password)

    return !hasRepeatingCharacters && !hasSequentialCharacters
}

export default class CreateUserService {
    private usersRepository: IUsersRepository
    private data: Omit<IUserDTO, '_id'>

    constructor({ usersRepository, data }: ICreateUserService) {
        this.usersRepository = usersRepository
        this.data = data
    }

    public async execute() {
        if (!this.data.fullName || !this.data.username || !this.data.email || !this.data.phone || !this.data.password) {
            throw new CustomError('Preencha todos os campos obrigatórios', 400)
        }

        if (typeof this.data.fullName !== 'string' || this.data.fullName.length < 3) {
            throw new CustomError("Nome completo deve ter pelo menos 3 caracteres", 400)
        }

        if (!isValidFullName(this.data.fullName)) {
            throw new CustomError("Nome completo só pode ter caracteres alfabéticos", 400)
        }

        if (typeof this.data.username !== 'string' || this.data.username.length < 3) {
            throw new CustomError("Nome de usuário deve ter pelo menos 3 caracteres", 400)
        }

        const normalizedUsername = normalizeString(this.data.username)

        const usernameExist = await this.usersRepository.findOne({ username: normalizedUsername })

        if (usernameExist) {
            throw new CustomError("Nome de usuário já utilizado", 400)
        }

        if (!isValidEmail(this.data.email.toString())) {
            throw new CustomError("Email com formato inválido", 400)
        }

        const normalizedEmail = normalizeString(this.data.email.toString())

        const emailExist = await this.usersRepository.findOne({ email: normalizedEmail })

        if (emailExist) {
            throw new CustomError("Email já utilizado", 400)
        }

        if (!isValidPhone(this.data.phone.toString())) {
            throw new CustomError("Telefone com formato inválido", 400)
        }

        if (this.data.password.length < 5) {
            throw new CustomError("Senha deve ter pelo menos 5 caracteres", 400)
        }

        if (!isPasswordValid(this.data.password.toString())) {
            throw new CustomError("Senha com caracteres repetidos ou sequenciais", 400)
        }

        const hashedPassword = await hash(this.data.password.toString(), 8)

        const user = await this.usersRepository.create({
            fullName: this.data.fullName,
            username: normalizedUsername,
            email: normalizedEmail,
            phone: this.data.phone,
            password: hashedPassword
        })
        return user
    }
}