import { Router } from "express";
import SessionsController from "../controllers/SessionsController";
import UserAvatarController from "../controllers/UserAvatarController";
import multer from "multer";
import uploadConfig from "config/upload";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const sessionsRouter = Router()
const sessionsController = new SessionsController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig)

sessionsRouter.get('/', ensureAuthenticated, sessionsController.show)
sessionsRouter.post('/', sessionsController.create)
sessionsRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

export default sessionsRouter