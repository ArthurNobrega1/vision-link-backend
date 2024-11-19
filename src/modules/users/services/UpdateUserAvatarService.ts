import CustomError from "@shared/errors/CustomError";
import IUsersRepository from "../repositories/IUsersRepository";
import uploadConfig from "config/upload";
import path from "path";
import fs from 'fs'
import cloudinary from "config/cloudinary";

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

        const filePath = path.resolve(uploadConfig.directory, this.avatarFilename);
        if (!fs.existsSync(filePath)) {
            throw new CustomError('Arquivo não encontrado no servidor local', 400);
        }

        const uploadResponse = await cloudinary.uploader.upload(filePath, {
            folder: process.env.CLOUDINARY_FOLDER || 'default'
        })

        if (user.avatar) {
            const publicId = user.avatar.split('/').pop()?.split('.')[0]
            if (publicId) {
                await cloudinary.uploader.destroy(publicId)
            }
        }

        user.avatar = uploadResponse.secure_url

        const userNewAvatar = await this.usersRepository.findByIdAndUpdate(this.userId, user, { new: true })

        // Remove tmp avatar file
        try {
            fs.unlinkSync(filePath)
        } catch (err) {
            console.error('Erro ao tentar remover o arquivo local:', err)
        }

        return userNewAvatar
    }
}