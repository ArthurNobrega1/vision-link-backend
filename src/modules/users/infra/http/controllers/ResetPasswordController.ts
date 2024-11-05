import WinstonLoggerProvider from "@shared/providers/LoggerProvider/implementations/WinstonLoggerProvider";
import { Request, Response } from "express";
import User from "../../mongoose/entities/User";
import ResetPasswordService from "@modules/users/services/ResetPasswordService";
import UserTokensRepository from "../../mongoose/repositories/UserTokensRepository";

export default class ResetPasswordController {
    private usersRepository = User
    private userTokensRepository = new UserTokensRepository()

    public create = async (request: Request, response: Response) => {
        const { password, token } = request.body

        const resetPassword = new ResetPasswordService({
            usersRepository: this.usersRepository,
            userTokensRepository: this.userTokensRepository
        })

        WinstonLoggerProvider.info('Iniciando reset de senha de usuário')
        await resetPassword.execute({
            token,
            password
        })
        WinstonLoggerProvider.info('Reset de senha de usuário concluído')

        response.status(204).json()
    }
}
