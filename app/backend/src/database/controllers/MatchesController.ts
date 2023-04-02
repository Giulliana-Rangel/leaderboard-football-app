import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private _service = new MatchesService()) {}

  getAllMatches = async (req: Request, res: Response) => {
    // const inProgress = req.query.inProgress === 'true';
    const { inProgress } = req.query;
    try {
      if (inProgress === undefined) {
        const allMatches = await this._service.getAllMatches();
        return res.status(200).json(allMatches);
      }
      const progress = await this._service.getAllMtachesProgress(inProgress === 'true');
      return res.status(200).json(progress);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: (error as Error).message });
    }
  };

  getByIdFinish = async (req: Request, res: Response) => {
    const { id } = req.params;
    // const { inProgress } = req.body;
    await this._service.getbyIdFinish(id);
    return res.status(200).json({ message: 'Finished' });
  };

  getUpdateMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    try {
      await this._service.getUpdateMatches(+id, homeTeamGoals, awayTeamGoals);
      // console.log('MatchesController ===>', update);
      return res.status(200).json({ message: 'The score has been changed' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: (error as Error).message });
    }
  };

  createNewMatch = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    try {
      const newMatch = await this._service.createNewMatch(
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
      );
      return res.status(201).json(newMatch);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: (error as Error).message });
    }
  };
}
