import WinstonLoggerProvider from "@shared/providers/LoggerProvider/implementations/WinstonLoggerProvider";
import { Request, Response } from "express";
import User from "../../mongoose/entities/User";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";

export default class UserAvatarController {
    private usersRepository = User

    public update = async (request: Request, response: Response) => {
        const updateUserAvatar = new UpdateUserAvatarService({
            usersRepository: this.usersRepository,
            avatarFilename: request.file?.filename,
            userId: request.user.id
        })

        WinstonLoggerProvider.info('Atualizando avatar do usuário')
        const newUser = await updateUserAvatar.execute()
        WinstonLoggerProvider.info('Avatar do usuário atualizado')

        response.status(200).json(newUser)
    }
}