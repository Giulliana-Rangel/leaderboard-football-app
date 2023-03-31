import * as express from 'express';
import MatchesController from '../database/controllers/MatchesController';

class MatchesRoute {
  route: express.Router;
  private _controller = new MatchesController();

  constructor() {
    this.route = express.Router();

    this.route.get('/', this._controller.getAllMatches);
    // this.route.get('/:id', this._controller.getById);
  }
}

const matchesRoute = new MatchesRoute();

export default matchesRoute;
