import WinstonLoggerProvider from "@shared/providers/LoggerProvider/implementations/WinstonLoggerProvider"
import { configDotenv } from "dotenv"
import mongoose from "mongoose"
configDotenv()

if (!process.env.MONGO_USER || !process.env.MONGO_PASS || !process.env.MONGO_HOST || !process.env.MONGO_PORT || !process.env.MONGO_DB) {
    WinstonLoggerProvider.error("Variáveis ​​de ambiente de conexão MongoDB ausentes")
    process.exit(1)
}

const mongoURI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
console.log(mongoURI)
const connectDatabase = async () => {
    try {
        WinstonLoggerProvider.info('Testando conexão com o MongoDB')
        await mongoose.connect(mongoURI)
        WinstonLoggerProvider.info('MongoDB conectado')
    } catch (error) {
        if (error instanceof Error) {
            WinstonLoggerProvider.error(`Erro ao conectar com o banco: ${error.message}`)
        } else {
            WinstonLoggerProvider.error("Erro desconhecido ao conectar com o banco")
        }
    }
}

connectDatabase()