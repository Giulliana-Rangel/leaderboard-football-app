import * as express from 'express';
import TeamsController from '../database/controllers/teams.controller';

class TeamsRoute {
  route: express.Router;
  private _controller = new TeamsController();

  constructor() {
    this.route = express.Router();

    this.route.get('/', this._controller.getAllTeams);
    this.route.get('/:id', this._controller.getById);
  }
}

const teamsRoute = new TeamsRoute();

export default teamsRoute;
