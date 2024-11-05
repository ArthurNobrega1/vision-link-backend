import { Router } from "express";
import RoutesController from "../controllers/RoutesController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const routesRouter = Router()
const routesController = new RoutesController()

routesRouter.get('/', routesController.index)
routesRouter.post('/', ensureAuthenticated, routesController.create)

export default routesRouter