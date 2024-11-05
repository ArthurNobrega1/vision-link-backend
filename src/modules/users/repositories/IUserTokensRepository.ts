import IUserTokenDTO from "../dto/IUserTokenDTO"

interface IUserTokensRepository {
    findByToken(token: string): Promise<IUserTokenDTO | null>
    generate(userId: string): Promise<IUserTokenDTO>
}

export default IUserTokensRepository