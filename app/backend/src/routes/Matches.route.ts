import * as express from 'express';
import MatchesController from '../database/controllers/MatchesController';
import tokenValidation from '../middlewares/tokenValidation';

class MatchesRoute {
  route: express.Router;
  private _controller = new MatchesController();

  constructor() {
    this.route = express.Router();

    this.route.get('/', this._controller.getAllMatches);
    this.route.patch('/:id', tokenValidation, this._controller.getUpdateMatches);
    this.route.patch('/:id/finish', tokenValidation, this._controller.getByIdFinish);
  }
}

const matchesRoute = new MatchesRoute();

export default matchesRoute;
