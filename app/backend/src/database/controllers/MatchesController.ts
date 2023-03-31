import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private _service = new MatchesService()) {}

  getAllMatches = async (req: Request, res: Response) => {
    // const inProgress = req.query.inProgress === 'true';
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const allMatches = await this._service.getAllMatches();
      return res.status(200).json(allMatches);
    }
    // try {

    const progress = await this._service.getAllMtachesProgress(inProgress === 'true');
    return res.status(200).json(progress);

    // } catch (error) {
    //   console.log(error);
    //   return res.status(500).json({ message: (error as Error).message });
    // }
  };
}
