import WinstonLoggerProvider from "@shared/providers/LoggerProvider/implementations/WinstonLoggerProvider";
import { Request, Response } from "express";

export default class IndexController {
    public show(request: Request, response: Response) {
        WinstonLoggerProvider.info('Show home message')
        response.status(200).json({ message: 'Hello!' })
    }
}