import * as express from 'express';
import LeaderBoardController from '../database/controllers/LeaderBoardController';
import LeaderBoardService from '../database/services/LeaderboardService';

class LeaderBoardRoute {
  route: express.Router;
  private _service = new LeaderBoardService();
  private _controller = new LeaderBoardController();

  constructor() {
    this.route = express.Router();

    this.route.get('/', this._controller.getAll.bind(this._controller));
    this.route.get('/away', this._controller.getAll.bind(this._controller));
    this.route.get('/home', this._controller.getAll.bind(this._controller));
  }
}
const leaderBoardRoute = new LeaderBoardRoute();
export default leaderBoardRoute;
