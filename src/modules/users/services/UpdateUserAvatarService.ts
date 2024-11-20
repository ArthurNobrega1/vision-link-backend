import CustomError from "@shared/errors/CustomError";
import IUsersRepository from "../repositories/IUsersRepository";
import uploadConfig from "config/upload";
import path from "path";
import fs from 'fs'
import cloudinary from "config/cloudinary";
import WinstonLoggerProvider from "@shared/providers/LoggerProvider/implementations/WinstonLoggerProvider";

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

        const filePath = path.resolve(uploadConfig.directory, this.avatarFilename)
        if (!fs.existsSync(filePath)) {
            throw new CustomError('Arquivo não encontrado no servidor local', 400)
        }

        const uploadResponse = await cloudinary.uploader.upload(filePath, {
            folder: process.env.CLOUDINARY_FOLDER || 'default'
        })

        if (user.avatar) {
            const publicId = user.avatar.split('/').slice(-2).join('/').replace(/\.(jpg|jpeg|png|gif|bmp|webp)$/i, '')
            if (publicId) {
                const destroyResponse = await cloudinary.uploader.destroy(publicId)
                WinstonLoggerProvider.info('Removendo foto do banco')
                if (destroyResponse.result !== 'ok') {
                    throw new CustomError('Erro ao excluir a imagem anterior do Cloudinary', 500)
                }
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