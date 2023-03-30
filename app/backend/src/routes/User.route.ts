import * as express from 'express';
import validaLogin from '../middlewares/loginValidation';
import errorMiddleware from '../middlewares/error-middleware';
import LoginController from '../database/controllers/User.controller';
import tokenValidation from '../middlewares/tokenValidation';

class UserRouter {
  router: express.Router;
  private _controller = new LoginController();

  constructor() {
    this.router = express.Router();

    this.router.post('/', validaLogin, this._controller.createLogin);
    this.router.use(errorMiddleware);
    this.router.get('/role', tokenValidation, this._controller.roleLogin);
  }
}

const userRouter = new UserRouter();

export default userRouter;
