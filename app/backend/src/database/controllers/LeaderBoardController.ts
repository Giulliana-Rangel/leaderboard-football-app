import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderboardService';

export default class LeaderBoardController {
  constructor(private _serviceLeader = new LeaderBoardService()) {}

  public getAll = async (req: Request, res: Response): Promise<Response | void> => {
    let path;

    if (req.url === '/') {
      path = '/';
    } else {
      path = req.url === '/home' ? 'home' : 'away';
    }
    try {
      const teams = await this._serviceLeader.getLeaderboard(path);
      return res.status(200).json(teams);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: (error as Error).message });
    }
  };
}
