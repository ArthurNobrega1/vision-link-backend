import CustomError from "@shared/errors/CustomError";
import IUsersRepository from "../repositories/IUsersRepository";
import uploadConfig from "config/upload";
import path from "path";
import fs from 'fs'

interface IUpdateUserAvatarService {
    usersRepository: IUsersRepository
    userId: string
    avatarFilename?: string
}

export default class UpdateUserAvatarService {
    private usersRepository: IUsersRepository
    private userId: string
    private avatarFilename?: string

    constructor({ usersRepository, avatarFilename, userId }: IUpdateUserAvatarService) {
        this.usersRepository = usersRepository
        this.userId = userId
        this.avatarFilename = avatarFilename
    }

    public async execute() {
        const user = await this.usersRepository.findOne({ _id: this.userId })

        if (!user) {
            throw new CustomError('Só usuários autenticados podem alterar seu avatar', 403)
        }

        if (!this.avatarFilename) {
            throw new CustomError('Avatar é obrigatório', 400)
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar.toString())
            const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath)

            if (userAvatarFileExist) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = this.avatarFilename

        const userNewAvatar = await this.usersRepository.findByIdAndUpdate(this.userId, user, { new: true })

        return userNewAvatar
    }
}