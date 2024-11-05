import WinstonLoggerProvider from "@shared/providers/LoggerProvider/implementations/WinstonLoggerProvider";
import { Request, Response } from "express";
import User from "../../mongoose/entities/User";
import CreateUserService from "@modules/users/services/CreateUserService";

export default class UsersController {
    private usersRepository = User

    public index = async (request: Request, response: Response) => {
        WinstonLoggerProvider.info('Buscando usuários')
        const users = await this.usersRepository.find({})
        WinstonLoggerProvider.info('Busca por usuários concluída')

        response.status(200).json(users)
    }

    public create = async (request: Request, response: Response) => {
        const { fullName, username, email, phone, password } = request.body

        const createUser = new CreateUserService({
            usersRepository: this.usersRepository,
            data: { fullName, username, email, phone, password }
        })

        WinstonLoggerProvider.info('Criando usuário')
        const user = await createUser.execute()
        WinstonLoggerProvider.info('Usuário criado')

        response.status(201).json(user)
    }
}