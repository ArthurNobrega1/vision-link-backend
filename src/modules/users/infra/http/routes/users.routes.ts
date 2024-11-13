import { Router } from "express";
import UsersController from "../controllers/UsersController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.index)
usersRouter.post('/', usersController.create)
usersRouter.delete('/', ensureAuthenticated, usersController.delete)

export default usersRouter