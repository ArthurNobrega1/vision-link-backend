import WinstonLoggerProvider from "@shared/providers/LoggerProvider/implementations/WinstonLoggerProvider";
import { Request, Response } from "express";
import User from "../../mongoose/entities/User";
import SendForgotPasswordEmailService from "@modules/users/services/SendForgotPasswordEmailService";
import EtherealMailProvider from "@shared/providers/MailProvider/implementations/EtherealMailProvider";
import UserTokensRepository from "../../mongoose/repositories/UserTokensRepository";

export default class ForgotPasswordController {
    private usersRepository = User
    private userTokensRepository = new UserTokensRepository()

    public create = async (request: Request, response: Response) => {
        const { email } = request.body

        const etherealMailProvider = new EtherealMailProvider()
        await etherealMailProvider.initialize()

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService({
            email,
            usersRepository: this.usersRepository,
            userTokensRepository: this.userTokensRepository,
            mailProvider: etherealMailProvider
        })

        WinstonLoggerProvider.info('Enviando email de esqueci minha senha para usuário')
        await sendForgotPasswordEmail.execute()
        WinstonLoggerProvider.info('Email de esqueci minha senha enviado para usuário')

        response.status(204).json()
    }
}
