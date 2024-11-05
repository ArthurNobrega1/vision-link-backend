export interface IMailProviderData {
    to: string
    body: string
    subject: string
}

interface IMailProvider {
    sendMail(data: IMailProviderData): Promise<void>
}

export default IMailProvider