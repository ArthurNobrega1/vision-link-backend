import CustomError from "@shared/errors/CustomError";
import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { configDotenv } from "dotenv"
configDotenv()

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new CustomError('Sessão inexistente', 401)
    }

    const [, token] = authHeader.split(' ')

    const tokenSecret = process.env.TOKEN_SECRET
    if (!tokenSecret) {
        throw new CustomError("Sessão não definida", 500)
    }

    try {
        const decoded = verify(token, tokenSecret)
        const { sub } = decoded as JwtPayload

        request.user = {
            id: sub as string
        }

        next()
    } catch (error) {
        throw new CustomError('Sessão inválida', 403)
    }
}