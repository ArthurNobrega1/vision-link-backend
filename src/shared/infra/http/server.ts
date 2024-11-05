import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import routes from './routes'
import '@shared/database'
import cors from 'cors';
import WinstonLoggerProvider from '@shared/providers/LoggerProvider/implementations/WinstonLoggerProvider';
import CustomError from '@shared/errors/CustomError';
import uploadConfig from 'config/upload';

const port = 3333

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        WinstonLoggerProvider.error(err.message)
        response.status(err.statusCode).json({ message: err.message })
        return
    }
    WinstonLoggerProvider.error("Erro interno no servidor: " + err.message)
    response.status(500).json({ message: "Erro interno no servidor" })
})

app.listen(port, () => {
    WinstonLoggerProvider.info(`🚀 Escutando a porta ${port}`)
})