import IUserTokensRepository from "@modules/users/repositories/IUserTokensRepository";
import UserToken from "../entities/UserToken";
import IUserTokenDTO from "@modules/users/dto/IUserTokenDTO";

export default class UserTokensRepository implements IUserTokensRepository {
    private ormRepository: typeof UserToken

    constructor() {
        this.ormRepository = UserToken
    }

    public findByToken = async (token: string): Promise<IUserTokenDTO | null> => {
        const userToken = await this.ormRepository.findOne({ token })

        return userToken
    }

    public generate = async (userId: string): Promise<IUserTokenDTO> => {
        const userToken = await this.ormRepository.findOneAndUpdate(
            { userId }, { userId },
            { new: true, upsert: true }
        )

        return userToken
    }
}