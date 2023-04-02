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

  public getbyIdFinish = async (id: number | string) => {
    const finished = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return finished;
  };

  public getUpdateMatches = async (
    id: number | string,
    homeTeamGoals:number,
    awayTeamGoals:number,
  ) => {
    const updateMatches = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id: +id } },
    );
    // console.log('MatchesServices', updateMatches);
    return updateMatches;
  };
}

export default MatchesService;
