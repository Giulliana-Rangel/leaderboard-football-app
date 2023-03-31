import { IMatches } from '../../interfaces/index.interface';
import Matches from '../models/Matches';
import Teams from '../models/Teams';

class MatchesService {
  constructor(private model = Matches) {}

  public getAllMatches = async ():Promise<IMatches[]> => {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  };

  public getAllMtachesProgress = async (inProgress: boolean): Promise<IMatches[]> => {
    const progress = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return progress;
  };
}

export default MatchesService;
