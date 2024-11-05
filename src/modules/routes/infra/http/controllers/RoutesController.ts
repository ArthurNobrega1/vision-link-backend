import WinstonLoggerProvider from "@shared/providers/LoggerProvider/implementations/WinstonLoggerProvider";
import { Request, Response } from "express";
import Route from "../../mongoose/entities/Route";
import User from "@modules/users/infra/mongoose/entities/User";
import CreateRouteService from "@modules/routes/services/CreateRouteService";

export default class RoutesController {
    private routesRepository = Route
    private userRepository = User

    public index = async (request: Request, response: Response) => {
        WinstonLoggerProvider.info('Buscando rotas')
        const routes = await this.routesRepository.find({})
        WinstonLoggerProvider.info('Busca por rotas concluída')

        response.status(200).json(routes)
    }

    public create = async (request: Request, response: Response) => {
        const { locationStart, locationEnd } = request.body

        const createRoute = new CreateRouteService({
            usersRepository: this.userRepository,
            routesRepository: this.routesRepository,
            data: { locationStart, locationEnd },
            id: request.user.id
        })

        WinstonLoggerProvider.info('Criando rota')
        const route = await createRoute.execute()
        WinstonLoggerProvider.info('Rota criada')

        response.status(201).json(route)
    }
}