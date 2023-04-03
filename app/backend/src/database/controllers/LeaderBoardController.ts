// import { Request, Response } from 'express';
// import { ILeaderboardHome } from '../../interfaces/index.interface';
// import LeaderBoardService from '../services/LeaderboardService';

// export default class LeaderBoardController {
//   private _service: ILeaderboardHome;

//   constructor(leaderBoardService: ILeaderboardHome) {
//     this._service = leaderBoardService;
//   }

//   public getAll = async (req: Request, res: Response): Promise<Response | void> => {
//     let path;

//     if (req.url === '/') {
//       path = '/';
//     } else {
//       path = req.url === '/home' ? 'home' : 'away';
//     }
//     try {
//       const teams = await this._service.getGeneralBoard(path);
//       return res.status(200).json(teams);
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
