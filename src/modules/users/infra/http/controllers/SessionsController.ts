import WinstonLoggerProvider from "@shared/providers/LoggerProvider/implementations/WinstonLoggerProvider";
import { Request, Response } from "express";
import User from "../../mongoose/entities/User";
import AuthUserService from "@modules/users/services/AuthUserService";

export default class SessionsController {
    private usersRepository = User

    public create = async (request: Request, response: Response) => {
        const { email, username, password } = request.body

        const authUser= new AuthUserService({
            usersRepository: this.usersRepository,
            data: { email, username, password }
        })

        WinstonLoggerProvider.info('Autenticando usuário')
        const { user, token } = await authUser.execute()
        WinstonLoggerProvider.info('Usuário autenticado')

        response.status(200).json({ user, token })
    }
}