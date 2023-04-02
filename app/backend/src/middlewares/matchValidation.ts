import { Request, Response, NextFunction } from 'express';
import Teams from '../database/models/Teams';

class MatchValidation {
  constructor(private _model = Teams) {}

  public matchValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { awayTeamId, homeTeamId } = req.body;
    const homeTeam = await this._model.findByPk(homeTeamId);
    const awayTeam = await this._model.findByPk(awayTeamId);

    if (awayTeamId === homeTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    if (!awayTeam || !homeTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  };
}
export default MatchValidation;
