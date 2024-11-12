import WinstonLoggerProvider from "@shared/providers/LoggerProvider/implementations/WinstonLoggerProvider";
import { Request, Response } from "express";
import User from "../../mongoose/entities/User";
import AuthUserService from "@modules/users/services/AuthUserService";
import GetUserService from "@modules/users/services/GetUserService";

export default class SessionsController {
    private usersRepository = User

    public create = async (request: Request, response: Response) => {
        const { email, username, password } = request.body

        const authUser = new AuthUserService({
            usersRepository: this.usersRepository,
            data: { email, username, password }
        })

        WinstonLoggerProvider.info('Autenticando usuário')
        const { user, token } = await authUser.execute()
        WinstonLoggerProvider.info('Usuário autenticado')

        response.status(200).json({ user, token })
    }

    public show = async (request: Request, response: Response) => {
        const getUser = new GetUserService({
            usersRepository: this.usersRepository,
            userId: request.user.id
        })

        WinstonLoggerProvider.info('Buscando usuários')
        const users = await getUser.execute()
        WinstonLoggerProvider.info('Busca por usuários concluída')

        response.status(200).json(users)
    }
}