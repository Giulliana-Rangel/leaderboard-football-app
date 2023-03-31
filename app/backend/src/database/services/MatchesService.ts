// import { IMatches } from '../../interfaces/index.interface';
import Matches from '../models/Matches';
import Teams from '../models/Teams';

class MatchesService {
  constructor(private model = Matches) {}

  public getAllMatches = async () => {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  };
}

export default MatchesService;

// :Promise<IMatches[]>
