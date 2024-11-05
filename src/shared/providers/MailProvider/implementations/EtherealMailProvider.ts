import IMailProvider, { IMailProviderData } from '../models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';

export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter | null = null

    public async initialize(): Promise<void> {
        const account = await nodemailer.createTestAccount();
        this.client = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        })
    }

    public async sendMail(data: IMailProviderData): Promise<void> {
        if (!this.client) {
            throw new Error('Transporter client não foi inicializado');
        }

        const info = await this.client.sendMail({
            from: 'Equipe VisionLink <equipe@visionlink.com.br>',
            to: data.to,
            subject: data.subject,
            text: data.body
        })

        console.log('Mensagem enviada: %s', info.messageId)
        console.log('Previsualização URL: %s', nodemailer.getTestMessageUrl(info))
    }
}
