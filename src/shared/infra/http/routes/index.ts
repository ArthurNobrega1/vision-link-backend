import { Router } from "express";
import IndexController from "../controllers/IndexController";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import routesRouter from "@modules/routes/infra/http/routes/routes.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import passwordRouter from "@modules/users/infra/http/routes/password.routes";

const indexController = new IndexController()
const routes = Router()

routes.get('/',indexController.show)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/routes', routesRouter)
routes.use('/password', passwordRouter)

export default routes