import CustomError from "@shared/errors/CustomError";
import IUsersRepository from "../repositories/IUsersRepository";
import IMailProvider from "@shared/providers/MailProvider/models/IMailProvider";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface ISendForgotPasswordEmailService {
    usersRepository: IUsersRepository
    userTokensRepository: IUserTokensRepository
    email: string
    mailProvider: IMailProvider
}

export default class SendForgotPasswordEmailService {
    private usersRepository: IUsersRepository
    private userTokensRepository: IUserTokensRepository
    private email: string
    private mailProvider: IMailProvider

    constructor({ usersRepository, email, mailProvider, userTokensRepository }: ISendForgotPasswordEmailService) {
        this.usersRepository = usersRepository
        this.userTokensRepository = userTokensRepository
        this.email = email
        this.mailProvider = mailProvider
    }

    public async execute() {
        if (!this.email) {
            throw new CustomError('Email é obrigatório', 400)
        }

        const user = await this.usersRepository.findOne({ email: this.email })

        if (!user) {
            throw new CustomError('Usuário não existe', 400)
        }

        const { token } = await this.userTokensRepository.generate(user._id)

        await this.mailProvider.sendMail({
            to: this.email,
            subject: 'Recuperação de senha',
            body: `Pedido de recuperação de senha recebido ${token}`
        })
    }
}