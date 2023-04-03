import { Request, Response, NextFunction } from 'express';
import LeaderBoardService from '../services/LeaderboardService';

export default class LeaderBoardController {
   constructor(private _service = LeaderBoardService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    // let path;

    // if (req.url === '/') {
    //   path = '/';
    // } else {
    //   path = req.url === '/home' ? 'home' : 'away';
    // }

    try {
      const teams = await LeaderBoardService.
    } catch (error) {
      console.log(error);
    }
  };
}
