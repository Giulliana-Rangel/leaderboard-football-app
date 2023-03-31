import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private _service = new MatchesService()) {}

  getAllMatches = async (_req: Request, res: Response) => {
    try {
      const matches = await this._service.getAllMatches();
      console.log('MatchesController', matches);
      return res.status(200).json(matches);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: (error as Error).message });
    }
  };
}
