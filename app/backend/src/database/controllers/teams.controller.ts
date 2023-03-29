import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  private service = new TeamsService();

  getAllTeams = async (req: Request, res: Response) => {
    try {
      const allTeams = await this.service.getAllTeams();
      return res.status(200).json(allTeams);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'internal error' });
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const team = await this.service.getById(id);

      if (!team) {
        return res.status(400).json({ message: 'Team not found' });
      }
      return res.status(200).json(team);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'internal error' });
    }
  };
}
